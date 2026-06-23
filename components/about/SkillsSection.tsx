import Badge from '@/components/ui/Badge'

interface SkillsSectionProps {
  skills: Record<string, string[]>
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <h3 className="mb-4 font-mono text-sm text-accent">{`// ${category}`}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map(skill => (
              <Badge key={skill} variant="default">{skill}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
