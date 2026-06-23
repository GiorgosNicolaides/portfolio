'use client'
import { useState, useEffect } from 'react'

export interface Education {
  institution: string
  country: string
  degree: string
  start: string
  end: string
  current: boolean
  thesis?: string
  grade?: string
}

export interface Certification {
  name: string
  issuer: string
  status: 'completed' | 'in_progress' | 'planned'
  expected?: string
  badge_url: string | null
}

export interface Research {
  title: string
  type: string
  institution: string
  year: string
  status: 'in_progress' | 'pending_submission' | 'completed'
  code_available: 'public' | 'upon_request'
  repo: string | null
  description: string
  highlights: string[]
  grade?: string
  stat?: string
  author_position?: string
}

export interface Volunteer {
  organisation: string
  chapter: string
  role: string
  start: string
  end: string
  highlights: string[]
}

export interface TryHackMe {
  username: string
  badge_url: string
  profile_url: string
}

export interface Profile {
  name: string
  title: string
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  tryhackme: TryHackMe
  personal_statement: string
  education: Education[]
  certifications: Certification[]
  research: Research[]
  volunteer: Volunteer[]
  skills: Record<string, string[]>
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('/data/profile.json')
      .then(res => res.json())
      .then((data: Profile) => {
        setProfile(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { profile, loading }
}