import data from '@/public/data/projects.json'
import type { Project } from '@/hooks/useProjects'

export const projects = data as unknown as Project[]

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
