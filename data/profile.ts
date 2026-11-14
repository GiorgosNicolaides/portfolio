export const profile = {
  name: 'Georgios Nicolaides',
  shortName: 'George Nicolaides',
  headline: 'Cybersecurity Analyst',
  currentRole: { title: 'Cybersecurity Analyst', company: 'Logicom Solutions' },
  interests: ['Security operations', 'Software engineering', 'DevOps & DevSecOps', 'AI automation'],
  pitch:
    "I'm early in my career and I know what I enjoy: software engineering, security and DevOps. I learn by building, so most of what I know comes from the projects below, which I've documented in detail, and from my day-to-day work as a cybersecurity analyst.",
  summary:
    "I recently finished an MEng in Cybersecurity at the University of Limerick, after a BSc in Informatics & Telematics at Harokopio University, and I now work as a Cybersecurity Analyst at Logicom Solutions, after starting out on a service desk at CDMA Services. Security, software engineering and DevOps are the work I enjoy most. I don't claim to be an expert. I've built and documented real projects, I use AI tools like Claude Code to learn and build faster, and I'm honest about what I still have to learn.",
  email: 'gnicolaides02@gmail.com',
  location: 'Nicosia, Cyprus',
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
  { value: '11', label: 'documented projects on GitHub' },
  { value: '10/10', label: 'BSc thesis grade' },
  { value: '7', label: 'vendor certifications (Sophos, Kaseya)' },
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
      'Helping implement an agentic SOC with Claude in Google SecOps at work',
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
      'SOC alert investigation and escalation in Google SecOps (SIEM & SOAR)',
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
      'Sophos Endpoint Architect, Endpoint Engineer and Workspace Protection certified',
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

export const skillGroups: { name: string; skills: string[]; wide?: boolean }[] = [
  {
    name: 'Security Operations (day job)',
    wide: true,
    skills: [
      'Google SecOps (SIEM & SOAR)',
      'Microsoft Defender',
      'CrowdStrike Falcon',
      'Cisco XDR',
      'Fortinet',
      'Palo Alto Networks',
      'Cisco',
      'Google Workspace & GCP',
      'Jira Service Management',
      'Intelligence X',
      'Custom monitoring scripts',
      'Agentic SOC with Claude',
      'Alert triage & escalation',
    ],
  },
  { name: 'DevOps', skills: ['Docker', 'Ansible', 'Jenkins', 'Azure', 'Linux', 'Git'] },
  {
    name: 'Security',
    skills: ['SIEM (ELK, Splunk)', 'MITRE ATT&CK', 'SAST (Semgrep, Bandit)', 'Dependency & secret scanning', 'Burp Suite', 'Nmap', 'Wireshark', 'GDPR'],
  },
  { name: 'AI & Automation', skills: ['Claude Code', 'Claude API', 'OpenAI API', 'Agentic SOC (Claude in Google SecOps)'] },
  {
    name: 'IT Operations',
    skills: ['Autotask PSA', 'IT Glue', 'Datto RMM', 'Sophos', 'Networking (TCP/IP, DNS, VPN)'],
  },
  { name: 'Programming', skills: ['Python', 'Bash', 'C', 'C++', 'Java', 'TypeScript / JavaScript', 'SQL'] },
  { name: 'Frameworks', skills: ['React', 'Next.js', 'Node.js', 'FastAPI'] },
]

export interface TimelineItem {
  kind: 'work' | 'education' | 'volunteer'
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
    title: 'Cybersecurity Analyst',
    org: 'Logicom Solutions',
    place: 'Nicosia, Cyprus',
    period: 'Nov 2026 – Present',
    current: true,
    points: [
      'Monitor and investigate security alerts in Google SecOps (SIEM & SOAR) across client environments, including Google Workspace and GCP, using Intelligence X for threat intelligence and custom scripts for monitoring',
      'Investigate detections from Microsoft Defender, CrowdStrike Falcon and Cisco XDR, and firewall events from Fortinet, Palo Alto and Cisco',
      'Triage and escalate incidents following established procedures, and document cases, findings and recommendations in Google SecOps SOAR and Jira Service Management',
      'Part of the team implementing an agentic SOC in Google SecOps with Claude',
    ],
  },
  {
    kind: 'work',
    title: 'Service Desk Engineer',
    org: 'CDMA Services Ltd.',
    place: 'Nicosia, Cyprus',
    period: 'Sep 2026 – Oct 2026',
    points: [
      'Level 1 support for client users and environments: triage, troubleshooting, resolution and escalation',
      'Microsoft 365 and Entra ID administration: user accounts, licences and access',
      'Ticket handling in Autotask PSA, documentation in IT Glue, and remote endpoint management with Datto RMM',
    ],
  },
  {
    kind: 'work',
    title: 'Freelance Developer',
    org: 'Self-employed, part-time',
    place: 'Remote',
    period: 'Aug 2026 – Present',
    current: true,
    points: ['Occasional side projects for clients, mainly web apps and AI agents that automate workflows'],
  },
  {
    kind: 'education',
    title: 'Master of Engineering, Cybersecurity',
    org: 'University of Limerick',
    place: 'Ireland',
    period: 'Sep 2025 – Aug 2026',
    points: [
      'Thesis (grade A2): Securing RFID/NFC Technologies in Resource-Constrained IoT Environments (SONDA-MA)',
      'Security Protocols: designed and benchmarked an ECDSA authentication protocol for LEO satellite IoT',
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
]

export const volunteering: TimelineItem[] = [
  {
    kind: 'volunteer',
    title: 'Co-Lead',
    org: 'Google Developer Group, Harokopio University',
    place: 'Greece',
    period: 'Sep 2024 – Jul 2025',
    points: [
      'Revived a dormant chapter and grew active membership from 5 to 50',
      'Ran monthly hands-on security workshops: SQL injection, enumeration, privilege escalation, OSINT',
      'Set up a partnership with NKUA GDG so the community survived institutional restructuring',
    ],
  },
  {
    kind: 'volunteer',
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
  issued: string
  expires: string
  href: string
  linkLabel: 'Verify' | 'View'
}

export const certifications: Certification[] = [
  {
    name: 'Sophos Endpoint Architect',
    issuer: 'Sophos (Credly)',
    issued: 'Sep 2026',
    expires: 'May 2027',
    href: 'https://www.credly.com/badges/3db34095-4922-43d3-a415-21c197e6e345/public_url',
    linkLabel: 'Verify',
  },
  {
    name: 'Sophos Endpoint Engineer (ET15)',
    issuer: 'Sophos Academy',
    issued: 'Sep 2026',
    expires: 'Dec 2027',
    href: '/certificates/sophos-et15-endpoint-engineer.webp',
    linkLabel: 'View',
  },
  {
    name: 'Sophos Workspace Protection (ET55)',
    issuer: 'Sophos Academy',
    issued: 'Sep 2026',
    expires: 'Apr 2028',
    href: '/certificates/sophos-et55-workspace-protection.webp',
    linkLabel: 'View',
  },
  {
    name: 'Kaseya Certified Technician in Datto RMM',
    issuer: 'Kaseya',
    issued: 'Sep 2026',
    expires: 'Sep 2028',
    href: 'https://app.diplomasafe.com/en-US/certificates/d17322b38e1028b74d7f41c2ba17b62cebbcdff59',
    linkLabel: 'Verify',
  },
  {
    name: 'Kaseya Certified Technician in Autotask PSA',
    issuer: 'Kaseya',
    issued: 'Sep 2026',
    expires: 'Sep 2028',
    href: 'https://app.diplomasafe.com/en-US/certificates/d999912cab013a869cb0527458c41fae7a53ae639',
    linkLabel: 'Verify',
  },
  {
    name: 'Kaseya Certified Technician in IT Glue',
    issuer: 'Kaseya',
    issued: 'Sep 2026',
    expires: 'Sep 2028',
    href: 'https://app.diplomasafe.com/en-US/certificates/db480b7c5d451c5453d92ef0a7d06085684c7e52c',
    linkLabel: 'Verify',
  },
  {
    name: 'Sophos Sales Professional',
    issuer: 'Sophos (Credly)',
    issued: 'Sep 2026',
    expires: 'May 2027',
    href: 'https://www.credly.com/badges/d3e69afe-d593-4892-a47d-c54f16953b2a/public_url',
    linkLabel: 'Verify',
  },
]
