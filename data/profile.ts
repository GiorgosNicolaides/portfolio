export const profile = {
  name: 'Georgios Nicolaides',
  shortName: 'George Nicolaides',
  headline: 'Junior Cybersecurity & DevOps Engineer',
  currentRole: { title: 'Service Desk Engineer', company: 'CDMA Services Ltd.' },
  targetRoles: ['Junior DevOps / DevSecOps', 'Junior Security Engineer', 'SOC Analyst'],
  pitch:
    "I'm early in my career and I know where I want to go: security and DevOps. I learn by building, so most of what I know comes from the projects below, which I've documented in detail, and from my day-to-day work on a service desk.",
  summary:
    "I recently finished an MEng in Cybersecurity at the University of Limerick, after a BSc in Informatics & Telematics at Harokopio University, and I now work as a Service Desk Engineer at CDMA Services. I'm looking for a junior role in DevOps, DevSecOps or security engineering, because that's the work I enjoy most. I don't claim to be an expert. I've built and documented real projects, I use AI tools like Claude Code to learn and build faster, and I'm honest about what I still have to learn.",
  email: 'gnicolaides02@gmail.com',
  location: 'Nicosia, Cyprus',
  workModes: ['On-site / hybrid in Cyprus', 'Remote'],
  languages: [
    { name: 'Greek', level: 'Native' },
    { name: 'English', level: 'Fluent' },
  ],
  github: 'https://github.com/GiorgosNicolaides',
  linkedin: 'https://www.linkedin.com/in/giorgosnicolaides/',
  cv: '/George_Nicolaides_CV.pdf',
  tryhackme: {
    username: 'georgenic',
    badge_url: 'https://tryhackme-badges.s3.amazonaws.com/georgenic.png',
    profile_url: 'https://tryhackme.com/p/georgenic',
  },
}

export const stats = [
  { value: '10+', label: 'security & DevOps tools shipped' },
  { value: '14', label: 'CIS AWS controls automated' },
  { value: '5', label: 'vendor certifications (Sophos, Kaseya)' },
  { value: '1,807×', label: 'faster keygen vs RSA-2048 (LEO research)' },
]

export interface Pillar {
  title: string
  icon: 'pipeline' | 'cloud' | 'radar' | 'lock' | 'spark' | 'desk'
  description: string
  points: string[]
}

export const pillars: Pillar[] = [
  {
    title: 'DevSecOps & CI/CD',
    icon: 'pipeline',
    description: 'Shift-left security that runs on every push, not once a quarter.',
    points: [
      'GitHub Actions and Jenkins pipelines with security gates',
      'Dependency CVE scanning (OSV.dev) and secret detection',
      'Static analysis rules mapped to CWE',
      'Container images built, tagged and pushed to GHCR',
    ],
  },
  {
    title: 'AI & Agentic Automation',
    icon: 'spark',
    description: 'Using AI tools to learn and build faster, and checking what they produce.',
    points: [
      'Agentic coding with Claude Code to build and test the tools on this site',
      'Reusable prompts, CLAUDE.md files, skills and security review checklists',
      'Claude and OpenAI APIs, plus GitHub Copilot in day-to-day work',
      'ML anomaly detection (Isolation Forest) in production-style APIs',
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    icon: 'cloud',
    description: 'Reproducible infrastructure that follows hardening baselines.',
    points: [
      'AWS S3, IAM and Security Group auditing against CIS Benchmarks',
      'Ansible playbooks for provisioning and deployment',
      'Docker Compose stacks and Kubernetes manifests with TLS ingress',
      'LocalStack for cost-free, repeatable cloud testing',
    ],
  },
  {
    title: 'Detection & Response',
    icon: 'radar',
    description: 'Turning noisy logs into alerts a person can triage quickly.',
    points: [
      'ML anomaly detection on SSH auth and Apache logs',
      'Incident response playbooks following NIST SP 800-61',
      'MITRE ATT&CK mapping and blue-team endpoint scanning',
      'SIEM workflows with the ELK Stack and Splunk',
    ],
  },
  {
    title: 'IT Operations & Endpoint',
    icon: 'desk',
    description: 'Day-to-day experience running real client environments.',
    points: [
      'L1 service desk support for client organisations',
      'Microsoft 365 and Entra ID user, licence and access administration',
      'Kaseya stack: Autotask PSA, IT Glue, Datto RMM',
      'Sophos-certified endpoint and workspace protection',
    ],
  },
  {
    title: 'Identity & Applied Crypto',
    icon: 'lock',
    description: 'Access control and protocols built so they fail closed.',
    points: [
      'Zero Trust policy engines with default deny',
      'JWT, RBAC, OAuth 2.0 and bcrypt done properly',
      'Protocols designed and checked with ProVerif',
      'ECDSA vs RSA performance engineering',
    ],
  },
]

export const skillGroups: { name: string; skills: string[] }[] = [
  { name: 'DevOps', skills: ['Docker', 'Ansible', 'Jenkins', 'Azure', 'Linux', 'Git'] },
  {
    name: 'Security',
    skills: ['SIEM (ELK, Splunk)', 'MITRE ATT&CK', 'SAST (Semgrep, Bandit)', 'Dependency & secret scanning', 'Burp Suite', 'Nmap', 'Wireshark', 'GDPR'],
  },
  { name: 'AI & Automation', skills: ['Claude Code', 'Claude API', 'OpenAI API'] },
  {
    name: 'IT Operations',
    skills: ['Autotask PSA', 'IT Glue', 'Datto RMM', 'Sophos', 'Networking (TCP/IP, DNS, VPN)'],
  },
  { name: 'Programming', skills: ['Python', 'Bash', 'C', 'C++', 'Java', 'TypeScript / JavaScript', 'SQL'] },
  { name: 'Frameworks', skills: ['React', 'Next.js', 'Node.js', 'FastAPI'] },
]

export interface TimelineItem {
  kind: 'work' | 'education' | 'leadership'
  title: string
  org: string
  place: string
  period: string
  current?: boolean
  points: string[]
}

export const timeline: TimelineItem[] = [
  {
    kind: 'work',
    title: 'Service Desk Engineer',
    org: 'CDMA Services Ltd.',
    place: 'Nicosia, Cyprus',
    period: 'Sep 2026 – Present',
    current: true,
    points: [
      'Level 1 support for client users and environments: triage, troubleshooting, resolution and escalation',
      'Microsoft 365 and Entra ID administration: user accounts, licences and access',
      'Ticket handling in Autotask PSA, documentation in IT Glue, and remote endpoint management with Datto RMM',
    ],
  },
  {
    kind: 'education',
    title: 'Master of Engineering, Cybersecurity',
    org: 'University of Limerick',
    place: 'Ireland',
    period: 'Sep 2025 – Aug 2026',
    points: [
      'Thesis: Securing RFID/NFC Technologies in Resource-Constrained IoT Environments (SONDA-MA)',
      'Security Protocols: designed and benchmarked an ECDSA authentication protocol for LEO satellite IoT',
    ],
  },
  {
    kind: 'leadership',
    title: 'Co-Lead',
    org: 'Google Developer Group, Harokopio University',
    place: 'Greece',
    period: 'Sep 2024 – Jul 2025',
    points: [
      'Revived a dormant chapter and grew active membership from 5 to 50',
      'Ran monthly hands-on security workshops: SQL injection, enumeration, privilege escalation, OSINT',
      'Mentored 6 teams (30+ students) at Hellenic University Hack. All 6 finished in the top 20',
      'Set up a partnership with NKUA GDG so the community survived institutional restructuring',
    ],
  },
  {
    kind: 'education',
    title: 'BSc Informatics & Telematics',
    org: 'Harokopio University',
    place: 'Greece',
    period: 'Oct 2021 – Jul 2025',
    points: [
      'Thesis (graded 10/10): Categorization of Cryptographic Vulnerabilities & Web Security Assessment',
      'Built COVSAW, a static analyser benchmarked against Semgrep and Bandit',
    ],
  },
  {
    kind: 'leadership',
    title: 'Core Team Developer',
    org: 'Google Developer Student Clubs, Harokopio University',
    place: 'Greece',
    period: 'Sep 2023 – Jul 2024',
    points: ['Built technical resources and helped run workshops on the developer track'],
  },
]

export interface Certification {
  name: string
  issuer: string
  year?: string
  href?: string
}

export const certifications: Certification[] = [
  { name: 'Sophos Certified Endpoint Engineer', issuer: 'Sophos', year: '2026' },
  { name: 'Sophos Workspace Protection', issuer: 'Sophos', year: '2026' },
  { name: 'Datto RMM Certified', issuer: 'Kaseya' },
  { name: 'Autotask PSA Certified', issuer: 'Kaseya' },
  { name: 'IT Glue Certified', issuer: 'Kaseya' },
]
