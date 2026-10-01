import { skillGroups } from '@/data/profile'
import SectionHeader from '@/components/ui/SectionHeader'

export default function Skills() {
  return (
    <section id="skills" className="border-y border-border-subtle bg-panel/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader
          eyebrow="Toolbox"
          title="Technologies I work with"
          subtitle="Every item here is something I use in my projects or in my day job, not just a keyword."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map(g => (
            <div key={g.name} className="card p-5">
              <h3 className="mb-4 text-sm font-semibold text-text-primary">{g.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {g.skills.map(s => (
                  <span
                    key={s}
                    className="rounded-md border border-border-subtle bg-background/60 px-2 py-1 text-xs text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
