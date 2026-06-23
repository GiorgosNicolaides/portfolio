'use client'
import { useState, useEffect } from 'react'

export interface Project {
  slug: string
  title: string
  description: string
  category: 'security' | 'cs' | 'research-tool' | 'research'
  tags: string[]
  github: string | null
  demo: string | null
  featured: boolean
  private: boolean
  type: 'project' | 'research'
  research_type?: string
  institution?: string
  year?: string
  status?: string
  author_position?: string
  stat?: string
  code_available?: string
  highlights?: string[]
  note?: string
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then((data: Project[]) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { projects, loading }
}