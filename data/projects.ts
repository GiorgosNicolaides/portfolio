export type ProjectCategory = 'software' | 'devsecops' | 'cloud' | 'detection' | 'appsec' | 'research'

export const categoryLabels: Record<ProjectCategory, string> = {
  software: 'Software Engineering',
  devsecops: 'DevSecOps & CI/CD',
  cloud: 'Cloud & Infrastructure',
  detection: 'Detection & Response',
  appsec: 'AppSec & Identity',
  research: 'Research',
}

export interface Project {
  slug: string
  title: string
  tagline: string
  category: ProjectCategory
  year: string
  featured: boolean
  team?: boolean
  private?: boolean
  github: string | null
  extraLinks?: { label: string; href: string }[]
  learnHref?: string
  stack: string[]
  metrics: { value: string; label: string }[]
  problem: string
  solution: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    slug: 'retail-catalogue-platform',
    title: 'Retail Catalogue & Admin Platform',
    tagline: 'A full-stack storefront with an admin dashboard, built as a separate Next.js frontend and REST API.',
    category: 'software',
    year: '2026',
    featured: true,
    github: 'https://github.com/GiorgosNicolaides/pasyky_frontend',
    stack: ['TypeScript', 'Next.js', 'React', 'Prisma', 'PostgreSQL', 'Zod', 'Upstash Redis', 'Cloudinary', 'Resend'],
    metrics: [
      { value: '6', label: 'product categories with their own spec schemas' },
      { value: '2', label: 'apps: storefront + API' },
      { value: '3', label: 'rate-limited endpoints' },
    ],
    problem:
      'Small retailers often want an online catalogue their staff can update themselves, with product listings, offers and stock levels, without running a full e-commerce platform.',
    solution:
      'A public Next.js storefront (catalogue, offers, stock, contact) and a separate Next.js API with an admin dashboard for managing products. Data lives in PostgreSQL through Prisma, images go to Cloudinary through signed uploads, and contact-form messages are sent by email with Resend. The backend API code is private.',
    highlights: [
      'Prisma schema with migrations and indexes for the queries the storefront actually runs',
      'Each product category has its own Zod schema for its spec sheet, so a knife and a jacket store the right fields',
      'Admin sessions use JWTs (jose) in httpOnly cookies, with bcrypt-hashed passwords',
      'Login, contact and upload endpoints are rate limited with Upstash Redis, which still works on serverless',
      'Upload requests are validated before they are signed, so non-images or oversized files never reach Cloudinary',
      'Admin actions and login attempts go to an append-only audit log, and the frontend sets a Content Security Policy',
    ],
  },
  {
    slug: 'devsecops-scanner',
    title: 'DevSecOps Pipeline Scanner',
    tagline: 'Dependency CVE and secret scanning that fails the build before a vulnerable release ships.',
    category: 'devsecops',
    year: '2026',
    featured: true,
    github: 'https://github.com/GiorgosNicolaides/devsecops-scanner',
    learnHref: '/learn/devsecops',
    stack: ['Python', 'FastAPI', 'OSV.dev', 'GitHub Actions', 'Docker', 'pytest'],
    metrics: [
      { value: '4', label: 'package ecosystems' },
      { value: '100', label: 'packages per OSV batch' },
      { value: '3', label: 'interfaces: CLI · API · Action' },
    ],
    problem:
      'Vulnerable dependencies and leaked credentials usually reach production because nothing in the pipeline checks for them.',
    solution:
      'A scanner that parses manifests across PyPI, npm, Go and crates.io, enriches them with OSV.dev CVE data, searches the tree for hard-coded secrets and returns a weighted risk score. It runs as a CLI, a REST API, a Docker image, and a GitHub Actions gate that fails the build at a configurable severity threshold.',
    highlights: [
      'GitHub Actions workflow scans each push and PR, and uploads the report as an artifact if the check fails',
      'Batched OSV.dev queries add severity, CVSS score, fixed version and aliases, with timeout and retry',
      'Detects AWS keys, GitHub/Stripe/Slack tokens, JWTs, private keys and DB connection strings',
      'Redacts secrets in all output (middle 60% masked) so the scan cannot leak what it finds',
      'Exit codes are built for CI, so it drops into any pipeline as a quality gate',
    ],
  },
  {
    slug: 'cloud-auditor',
    title: 'Cloud Misconfiguration Auditor',
    tagline: 'Automated CIS AWS Foundations checks for S3, IAM and Security Groups, testable locally at no cost.',
    category: 'cloud',
    year: '2026',
    featured: true,
    github: 'https://github.com/GiorgosNicolaides/cloud-auditor',
    learnHref: '/learn/cloud-audit',
    stack: ['Python', 'Boto3', 'AWS', 'LocalStack', 'FastAPI', 'Docker Compose'],
    metrics: [
      { value: '14', label: 'CIS controls checked' },
      { value: '3', label: 'AWS services audited' },
      { value: '$0', label: 'cloud spend to test' },
    ],
    problem:
      'Misconfigurations such as public buckets, root access keys and SSH open to the world cause most cloud breaches, and checking for them by hand does not scale.',
    solution:
      'An auditor that maps every finding to a CIS AWS Foundations Benchmark rule, ranks findings by severity and returns a risk score through a rate-limited FastAPI service. Docker Compose starts it alongside LocalStack with health-checked dependencies, and a seed script creates deliberately insecure resources so every check can be demonstrated.',
    highlights: [
      'S3 checks: encryption, versioning, access logging, Block Public Access, public ACLs',
      'IAM checks: root keys, password policy, console MFA, inline policies, AdministratorAccess on users',
      'Security Group checks: unrestricted ingress and egress, SSH/RDP open to 0.0.0.0/0',
      'Pluggable check modules (s3 / iam / security_groups) behind one runner and report layer',
      'Container waits on LocalStack health before starting, so the stack comes up the same way every time',
    ],
  },
  {
    slug: 'threat-detection-engine',
    title: 'AI-Powered Threat Detection Engine',
    tagline: 'Unsupervised anomaly detection that turns raw SSH and Apache logs into ranked, explained alerts.',
    category: 'detection',
    year: '2026',
    featured: true,
    github: 'https://github.com/GiorgosNicolaides/threat-detection-engine',
    learnHref: '/learn/log-anomaly',
    stack: ['Python', 'scikit-learn', 'Isolation Forest', 'FastAPI', 'Docker', 'pytest'],
    metrics: [
      { value: '2', label: 'log formats auto-detected' },
      { value: '5', label: 'anomaly classes explained' },
      { value: '0', label: 'labelled attack data needed' },
    ],
    problem:
      'Analysts get raw log volume, not signal, and labelled attack data for training a supervised model is rarely available.',
    solution:
      'A detection service that auto-detects the log format, parses each line into a shared feature space, scores it with an Isolation Forest and returns alerts with a severity and a plain-English reason. The API is hardened with size caps, input validation and rate limiting.',
    highlights: [
      'Finds brute force (sliding 5-minute window per IP), root login attempts and authentication failures',
      'Engineered features include off-hours activity, first-seen IPs and failures per IP',
      'Each alert gives a reason ("Brute force pattern from IP …") so it can be triaged without reading model scores',
      'Model can be retrained from sample data with one command; results are reproducible',
    ],
  },
  {
    slug: 'devops-cicd-pipeline',
    title: 'End-to-End CI/CD & Kubernetes Delivery',
    tagline: 'Jenkins, Ansible, Docker and Kubernetes delivering a Spring Boot + Vue app from commit to TLS-secured production.',
    category: 'cloud',
    year: '2024',
    featured: true,
    team: true,
    github: 'https://github.com/GiorgosNicolaides/devops-backend',
    extraLinks: [
      { label: 'Ansible playbooks', href: 'https://github.com/GiorgosNicolaides/ansible-devops' },
      { label: 'Frontend', href: 'https://github.com/GiorgosNicolaides/devops-frontend' },
    ],
    stack: ['Jenkins', 'Ansible', 'Docker', 'Kubernetes', 'cert-manager', 'Nginx', 'PostgreSQL', 'GHCR', 'Vagrant', 'Azure'],
    metrics: [
      { value: '3', label: 'deployment targets: VM · Compose · K8s' },
      { value: '7', label: 'Ansible playbooks' },
      { value: 'TLS', label: 'automated with cert-manager' },
    ],
    problem:
      'Shipping a multi-tier application (Spring Boot API, Vue SPA, PostgreSQL) repeatably across environments without manual steps.',
    solution:
      'Three Jenkins pipelines deploy the same application three ways: onto VMs with Ansible (systemd + Nginx), as a Docker Compose stack on a remote host, and to Kubernetes with Deployments, Services, PVC-backed PostgreSQL and TLS Ingress from cert-manager. Images are built from a non-root Dockerfile and pushed to GitHub Container Registry.',
    highlights: [
      'Jenkins stages run tests, build and push images, then trigger the Ansible or kubectl deployment',
      'Ansible roles and Jinja2 templates for PostgreSQL, Spring Boot systemd units and Nginx reverse proxy',
      'Kubernetes liveness/readiness probes on Spring Actuator health endpoints',
      'Non-root container images, registry credentials stored as Jenkins secrets',
      'Vagrant multi-VM lab for local testing, with an Azure VM as the cloud target',
    ],
  },
  {
    slug: 'zero-trust-dashboard',
    title: 'Zero Trust Identity Dashboard',
    tagline: 'A default-deny policy engine that checks identity, time and network context on every request.',
    category: 'appsec',
    year: '2026',
    featured: false,
    github: 'https://github.com/GiorgosNicolaides/zero-trust-dashboard',
    learnHref: '/learn/zero-trust',
    stack: ['Node.js', 'Express', 'Next.js', 'JWT', 'bcrypt', 'SQLite', 'Docker'],
    metrics: [
      { value: '100%', label: 'requests evaluated' },
      { value: '0', label: 'tokens exposed to browser JS' },
      { value: '3', label: 'context signals per decision' },
    ],
    problem:
      'Perimeter-based access assumes anything inside the network is trusted, so one stolen session gives an attacker broad access.',
    solution:
      'An Express API that evaluates role, time of day and source IP/CIDR against a declarative policy file on every call, paired with a Next.js dashboard for testing policies and auditing decisions. The JWT lives in an httpOnly cookie and is proxied server-side, so browser JavaScript never sees it.',
    highlights: [
      'Default-deny policy engine driven by a declarative policies.json',
      'Token revocation is persisted, so it survives restarts, and every decision is written to an append-only audit log',
      'Defence in depth: rate limiting, helmet headers, CORS allow-list, input validation, edge middleware',
      'bcrypt password hashing and JWTs with configurable expiry',
    ],
  },
  {
    slug: 'ir-simulator',
    title: 'Incident Response Runbook Simulator',
    tagline: 'Decision-tree IR training mapped to MITRE ATT&CK, with scored post-incident reports.',
    category: 'detection',
    year: '2026',
    featured: false,
    github: 'https://github.com/GiorgosNicolaides/ir-simulator',
    learnHref: '/learn/ir-kill-chain',
    stack: ['Python', 'FastAPI', 'MITRE ATT&CK', 'NIST SP 800-61', 'Docker', 'pytest'],
    metrics: [
      { value: '2', label: 'scenarios: phishing · ransomware' },
      { value: '5', label: 'IR lifecycle phases' },
    ],
    problem:
      'Responders get little practice making containment and eradication decisions before a real incident happens.',
    solution:
      'A FastAPI state machine takes the player through realistic incidents stage by stage. It rewards good practice (contain before monitoring, preserve evidence, verify backups) and penalises shortcuts an attacker would exploit, then produces a graded report mapped to ATT&CK techniques.',
    highlights: [
      'Follows the NIST SP 800-61 / SANS PICERL lifecycle',
      'Scenarios are stored as JSON, so new playbooks need no code changes',
      'Defensive and educational: no exploit code, only decision logic',
    ],
  },
  {
    slug: 'covsaw',
    title: 'COVSAW: Crypto Misuse Static Analyser',
    tagline: 'AST-based SAST for Python with 30+ CWE-mapped rules, benchmarked against Semgrep and Bandit.',
    category: 'appsec',
    year: '2025',
    featured: true,
    github: 'https://github.com/GiorgosNicolaides/COVSAW',
    stack: ['Python', 'AST', 'CWE', 'pytest', 'setuptools'],
    metrics: [
      { value: '30+', label: 'detection rules' },
      { value: '200', label: 'file benchmark corpus' },
      { value: '10/10', label: 'thesis grade' },
    ],
    problem:
      'General-purpose linters miss many cryptographic misuse patterns: broken hashes, hard-coded keys, insecure randomness, weak TLS.',
    solution:
      'A static analysis CLI that parses Python into an AST and runs a pluggable rule engine. Each rule is mapped to CWE identifiers, and findings are exported as JSON, CSV or HTML for use in code review and CI.',
    highlights: [
      'Rules are discovered as plugins via importlib; categories: algorithms, credentials, key management, randomness, transport, sensitive data',
      'Reads TOML, YAML and INI project configuration',
      'Undergraduate thesis graded 10/10',
    ],
  },
  {
    slug: 'malware-detection-scanner',
    title: 'Windows Malware Detection Scanner',
    tagline: 'Blue-team endpoint triage with threat-intel enrichment, packaged as one portable .exe.',
    category: 'detection',
    year: '2026',
    featured: false,
    github: 'https://github.com/GiorgosNicolaides/malware_detection_scanner',
    stack: ['Python', 'VirusTotal API', 'abuse.ch', 'tkinter', 'PyInstaller', 'Windows'],
    metrics: [
      { value: '70+', label: 'AV engines via VirusTotal' },
      { value: '6', label: 'registry run keys audited' },
    ],
    problem:
      'First-response triage on a Windows host that may be compromised, often where Python or other tooling cannot be installed.',
    solution:
      'A scanner that checks running processes, network connections, persistence points and risky file locations, enriches findings with VirusTotal and the live abuse.ch IP blocklist, and generates a colour-coded HTML report sorted by severity.',
    highlights: [
      'Flags process injection indicators, suspicious paths, double extensions and hidden executables',
      'Matches outbound connections against live threat-intel feeds',
      'Built as a single Windows .exe from Linux, so nothing needs installing on the target',
    ],
  },
  {
    slug: 'sonda-ma',
    title: 'SONDA-MA: RFID/NFC Mutual Authentication',
    tagline: 'MEng thesis: a lightweight mutual-authentication protocol for passive tags, formally verified with ProVerif.',
    category: 'research',
    year: '2026',
    featured: false,
    private: true,
    github: null,
    learnHref: '/learn/rfid-nfc',
    stack: ['C', 'Python', 'ProVerif', 'PN532 / libnfc', 'Flipper Zero', 'Make'],
    metrics: [
      { value: 'ProVerif', label: 'formally verified design' },
      { value: '~3.2k GE', label: 'fits Class 1 tags (≤10k GE)' },
      { value: '41', label: 'automated tests' },
    ],
    problem:
      'Passive RFID/NFC tags have only around 10,000 gate equivalents, too few for AES or public-key crypto, and many lightweight protocols have already been broken by replay, cloning or desynchronisation attacks.',
    solution:
      'A protocol in C with an S-box-augmented one-way function (algebraic degree 3), a tag-side nonce derived from a counter so the tag needs no TRNG, and a split of the session key by direction so the tag and reader proofs are independent. The design was formally checked with ProVerif and tested against replay, cloning, desynchronisation and forward-secrecy attacks.',
    highlights: [
      'Whole protocol implemented in C; a Python harness drives the compiled binary as a black box',
      'Integration tests cover replay, cloning, desync, forward secrecy and mutual authentication',
      'Benchmarked at ~26.6 µs mean latency, ~1.7 MB peak RSS and ~54.8k CPU cycles per session',
      'Fits within the ISO/IEC Class 1 budget of about 10,000 GE',
    ],
  },
  {
    slug: 'leo-auth-protocol',
    title: 'LEO Satellite IoT Authentication Protocol',
    tagline: 'ECDSA P-256 mutual authentication on a three-container Docker testbed with attack simulation.',
    category: 'research',
    year: '2026',
    featured: false,
    private: true,
    github: null,
    learnHref: '/learn/public-key-crypto',
    stack: ['Python', 'ECDSA P-256', 'SHA-256', 'Docker Compose', 'cryptography'],
    metrics: [
      { value: '1,807×', label: 'faster keygen than RSA-2048' },
      { value: '19×', label: 'faster signing' },
      { value: '3', label: 'isolated containers' },
    ],
    problem:
      'Constrained IoT devices on LEO satellite links need mutual authentication that resists replay and tampering without the cost of RSA.',
    solution:
      'A challenge-response protocol between an IoT device, a satellite gateway and a ground station, each running in its own container on an isolated bridge network. It uses ECDSA P-256 signatures, SHA-256 session tokens, and nonce plus timestamp for replay protection. An attack simulator runs replay, tamper and impersonation attempts against it.',
    highlights: [
      'Key generation 0.025 ms vs 45.4 ms for RSA-2048; signatures 3.6× smaller',
      'Gateway checks devices against a whitelist and signs a counter-challenge, so authentication is mutual',
      'The testbed is reproducible with a single docker-compose up',
    ],
  },
  {
    slug: 'agri-coop',
    title: 'Secure Cooperative Management Platform',
    tagline: 'A stateless Spring Boot REST API with JWT and method-level RBAC, plus a Vue 3 SPA, fully containerised.',
    category: 'appsec',
    year: '2024',
    featured: false,
    team: true,
    github: 'https://github.com/GiorgosNicolaides/agri-coop',
    learnHref: '/learn/rbac',
    stack: ['Java 17', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Vue 3', 'Docker'],
    metrics: [
      { value: '3', label: 'user roles enforced' },
      { value: 'JWT', label: 'stateless auth' },
    ],
    problem: 'A multi-role business application needs authorisation enforced on the server, not just hidden in the UI.',
    solution:
      'A layered Spring Boot API (controller, service, repository) secured with JWT bearer authentication, BCrypt, and @Secured role checks on methods. Swagger UI documents the API, and Docker images are provided for the backend and the Nginx-served frontend.',
    highlights: [
      'Stateless Spring Security 6 filter chain validates the JWT on every request',
      'Input validation and BCrypt password hashing',
      'H2 for tests and PostgreSQL in deployment',
    ],
  },
]

export const featuredProjects = projects.filter(p => p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
