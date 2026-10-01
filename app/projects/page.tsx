import type { Metadata } from 'next'
import ProjectsView from '@/components/projects/ProjectsView'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'DevSecOps, cloud security, detection engineering and applied cryptography projects: CI/CD scanners, CIS AWS auditing, Kubernetes delivery, Zero Trust and ML threat detection.',
}

export default function ProjectsPage() {
  return <ProjectsView />
}
