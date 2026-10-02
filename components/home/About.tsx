import { pillars, profile, stats } from '@/data/profile'
import SectionHeader from '@/components/ui/SectionHeader'
import { CloudIcon, HeadsetIcon, LockIcon, PipelineIcon, RadarIcon, SparkIcon } from '@/components/ui/Icons'

const icons = {
  pipeline: PipelineIcon,
  cloud: CloudIcon,
  radar: RadarIcon,
  lock: LockIcon,
  spark: SparkIcon,
  desk: HeadsetIcon,
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

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <SectionHeader eyebrow="About" title="Where I am and where I'm heading" className="mb-6" />
          <p className="leading-relaxed text-text-muted">{profile.summary}</p>
        </div>

        <dl className="card grid content-start gap-5 p-6 text-sm">
          <div>
            <dt className="eyebrow mb-2">Target roles</dt>
            <dd className="flex flex-wrap gap-2">
              {profile.targetRoles.map(r => (
                <span key={r} className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
                  {r}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-1.5">Currently</dt>
            <dd className="text-text-primary">
              {profile.currentRole.title} · {profile.currentRole.company}
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-1.5">Work mode</dt>
            <dd className="text-text-primary">{profile.workModes.join(' · ')}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1.5">Languages</dt>
            <dd className="text-text-primary">
              {profile.languages.map(l => `${l.name} (${l.level})`).join(' · ')}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  )
}
