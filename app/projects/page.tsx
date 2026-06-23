import type { Metadata } from 'next'
import ProjectsView from '@/components/projects/ProjectsView'

const description =
  'Security engineering projects including Zero Trust dashboards, AI threat detection, DevSecOps scanners, and cloud misconfiguration auditing.'

export const metadata: Metadata = {
  title: 'Projects — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Projects — Georgios Nicolaides',
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
}

export default function ProjectsPage() {
  return <ProjectsView />
}
