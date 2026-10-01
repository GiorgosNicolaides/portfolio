export const profile = {
  name: 'Georgios Nicolaides',
  shortName: 'George Nicolaides',
  headline: 'DevSecOps & Cloud Security Engineer',
  targetRoles: ['DevOps Engineer', 'DevSecOps Engineer', 'Cloud Security', 'Security Engineer / SOC'],
  pitch:
    'I build security into the delivery pipeline. CI/CD security gates, cloud misconfiguration auditing, containerised services and log-based threat detection, all written, tested and shipped as working tools.',
  summary:
    'MEng Cybersecurity graduate (University of Limerick) and BSc Informatics & Telematics (Harokopio University, thesis graded 10/10). My work sits between operations and security: I automate infrastructure with Ansible, Docker and Kubernetes, put scanners and policy checks into pipelines, and build the detection and response tooling a SOC team relies on. I also do applied cryptography research, including a lightweight RFID/NFC mutual-authentication protocol that I formally verified with ProVerif.',
  email: 'gnicolaides02@gmail.com',
  location: 'Nicosia, Cyprus',
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
  { value: '1,807×', label: 'faster keygen vs RSA-2048 (LEO research)' },
  { value: '10/10', label: 'BSc thesis grade' },
]

export interface Pillar {
  title: string
  icon: 'pipeline' | 'cloud' | 'radar' | 'lock'
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
  {
    name: 'Cloud & Infrastructure as Code',
    skills: ['AWS (S3 · IAM · EC2/SG)', 'Boto3', 'LocalStack', 'Azure VMs', 'Ansible', 'Vagrant', 'Linux hardening'],
  },
  {
    name: 'Containers & Orchestration',
    skills: ['Docker', 'Docker Compose', 'Kubernetes', 'Ingress + cert-manager TLS', 'Nginx', 'GHCR'],
  },
  {
    name: 'CI/CD & Automation',
    skills: ['GitHub Actions', 'Jenkins Pipelines', 'Security gating', 'Bash', 'Make', 'pytest'],
  },
  {
    name: 'Security Tooling',
    skills: ['OSV.dev', 'Semgrep', 'Bandit', 'Burp Suite', 'Nmap', 'Wireshark', 'VirusTotal API', 'ProVerif', 'Flipper Zero'],
  },
  {
    name: 'Detection & Response',
    skills: ['SIEM (ELK, Splunk)', 'Log analysis', 'scikit-learn', 'MITRE ATT&CK', 'NIST SP 800-61', 'CIS Benchmarks', 'NIST CSF'],
  },
  {
    name: 'AppSec & Identity',
    skills: ['Zero Trust', 'JWT', 'RBAC', 'OAuth 2.0', 'Spring Security', 'Secure SDLC', 'CWE / OWASP'],
  },
  {
    name: 'Languages',
    skills: ['Python', 'Bash', 'C', 'Java', 'TypeScript / JavaScript', 'SQL'],
  },
  {
    name: 'Frameworks & Data',
    skills: ['FastAPI', 'Node.js / Express', 'Next.js / React', 'Spring Boot', 'PostgreSQL', 'SQLite'],
  },
]

export interface TimelineItem {
  kind: 'education' | 'leadership'
  title: string
  org: string
  place: string
  period: string
  points: string[]
}

export const timeline: TimelineItem[] = [
  {
    kind: 'education',
    title: 'Master of Engineering, Cybersecurity (graduated)',
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

export const certifications = [
  { name: 'TryHackMe', issuer: 'Hands-on offensive & defensive labs', status: 'Active', href: 'https://tryhackme.com/p/georgenic' },
]
