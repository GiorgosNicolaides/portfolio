'use client'
import { useState } from 'react'

interface Technique {
  id: string
  name: string
  description: string
  detection: string
  mitigation: string
}

interface Tactic {
  name: string
  techniques: Technique[]
}

const TACTICS: Tactic[] = [
  {
    name: 'Initial Access',
    techniques: [
      { id: 'T1566', name: 'Phishing', description: 'Adversaries send malicious emails to gain a foothold. Attachments or links deliver the payload.', detection: 'Email gateway analysis, attachment sandboxing, user reporting.', mitigation: 'User training, link rewriting, attachment filtering.' },
      { id: 'T1190', name: 'Exploit Public App', description: 'Adversaries exploit an internet-facing application. Unpatched CVEs are a common vector.', detection: 'WAF logs, anomalous request patterns, IDS signatures.', mitigation: 'Patch management, WAF, network segmentation.' },
      { id: 'T1078', name: 'Valid Accounts', description: 'Adversaries use legitimate credentials to access systems. Often sourced from breaches.', detection: 'Impossible-travel alerts, anomalous login times.', mitigation: 'MFA, credential rotation, least privilege.' },
    ],
  },
  {
    name: 'Execution',
    techniques: [
      { id: 'T1059', name: 'Command Scripting', description: 'Adversaries run scripts via PowerShell, bash, or cmd to execute code.', detection: 'Script-block logging, process command-line auditing.', mitigation: 'Constrained language mode, application control.' },
      { id: 'T1203', name: 'Client Exploitation', description: 'Exploit a vulnerability in a client application such as a browser or document reader.', detection: 'Endpoint exploit-prevention telemetry.', mitigation: 'Patching, exploit guard, sandboxing.' },
      { id: 'T1072', name: 'Software Deployment', description: 'Abuse deployment tools to push payloads to many hosts at once.', detection: 'Audit deployment-tool job creation.', mitigation: 'Restrict and monitor admin tooling.' },
    ],
  },
  {
    name: 'Persistence',
    techniques: [
      { id: 'T1053', name: 'Scheduled Tasks', description: 'Create scheduled tasks/cron jobs to maintain access across reboots.', detection: 'Audit task creation events.', mitigation: 'Restrict task creation, monitor cron.' },
      { id: 'T1547', name: 'Boot Autostart', description: 'Add registry run keys or startup items to persist at boot.', detection: 'Monitor autostart locations.', mitigation: 'Baseline and alert on changes.' },
      { id: 'T1078', name: 'Valid Accounts', description: 'Maintain access using legitimate accounts created or hijacked earlier.', detection: 'Account-usage anomaly detection.', mitigation: 'Credential rotation, MFA.' },
    ],
  },
  {
    name: 'Privilege Escalation',
    techniques: [
      { id: 'T1068', name: 'Exploitation', description: 'Exploit a software flaw to gain higher privileges.', detection: 'Kernel/EDR exploit telemetry.', mitigation: 'Patching, least privilege.' },
      { id: 'T1055', name: 'Process Injection', description: 'Inject code into another process to elevate or evade.', detection: 'Monitor cross-process memory writes.', mitigation: 'Behavior-based EDR.' },
      { id: 'T1134', name: 'Token Manipulation', description: 'Duplicate or impersonate access tokens to assume privileges.', detection: 'Audit token-privilege use.', mitigation: 'Restrict SeImpersonate, least privilege.' },
    ],
  },
  {
    name: 'Defense Evasion',
    techniques: [
      { id: 'T1036', name: 'Masquerading', description: 'Rename or relocate malware to look legitimate.', detection: 'Hash/path mismatch analysis.', mitigation: 'Application control, signature checks.' },
      { id: 'T1055', name: 'Process Injection', description: 'Run within a trusted process to evade defenses.', detection: 'Memory-injection telemetry.', mitigation: 'EDR behavioral rules.' },
      { id: 'T1070', name: 'Indicator Removal', description: 'Clear logs and artifacts to hinder investigation.', detection: 'Centralized immutable logging.', mitigation: 'Forward logs off-host, restrict deletion.' },
    ],
  },
  {
    name: 'Lateral Movement',
    techniques: [
      { id: 'T1021', name: 'Remote Services', description: 'Use RDP, SSH, or SMB to move between hosts.', detection: 'East-west traffic monitoring.', mitigation: 'Network segmentation, MFA on remote services.' },
      { id: 'T1091', name: 'Removable Media', description: 'Spread via USB or removable media.', detection: 'Removable-media auditing.', mitigation: 'Disable autorun, restrict media.' },
      { id: 'T1550', name: 'Use Alt Auth', description: 'Pass-the-hash / pass-the-ticket using stolen material.', detection: 'Kerberos anomaly detection.', mitigation: 'Credential Guard, tiered admin.' },
    ],
  },
  {
    name: 'Exfiltration',
    techniques: [
      { id: 'T1048', name: 'Exfil Over Alt Protocol', description: 'Send data over a protocol different from the C2 channel.', detection: 'Egress DLP, protocol anomaly detection.', mitigation: 'Egress filtering, DLP.' },
      { id: 'T1567', name: 'Exfil to Web Service', description: 'Upload data to a legitimate cloud or web service.', detection: 'Monitor uploads to known services.', mitigation: 'CASB, allow-listing.' },
      { id: 'T1041', name: 'Exfil over C2', description: 'Send stolen data back through the existing C2 channel.', detection: 'C2 beaconing analysis.', mitigation: 'Block C2 infrastructure, egress filtering.' },
    ],
  },
]

const PHISHING = new Set(['T1566', 'T1078', 'T1021', 'T1048', 'T1567'])
const RANSOMWARE = new Set(['T1486', 'T1490', 'T1083', 'T1489'])

export default function MITREDiagram() {
  const [selected, setSelected] = useState<Technique | null>(null)
  const [scenario, setScenario] = useState<'none' | 'phishing' | 'ransomware'>('none')

  const highlight = scenario === 'phishing' ? PHISHING : scenario === 'ransomware' ? RANSOMWARE : null

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setScenario(s => (s === 'phishing' ? 'none' : 'phishing'))}
          className={`rounded border px-4 py-2 font-mono text-sm transition-colors ${
            scenario === 'phishing' ? 'border-danger bg-danger/10 text-danger' : 'border-border-subtle text-text-muted hover:border-danger/50'
          }`}
        >
          Phishing Scenario
        </button>
        <button
          type="button"
          onClick={() => setScenario(s => (s === 'ransomware' ? 'none' : 'ransomware'))}
          className={`rounded border px-4 py-2 font-mono text-sm transition-colors ${
            scenario === 'ransomware' ? 'border-warning bg-warning/10 text-warning' : 'border-border-subtle text-text-muted hover:border-warning/50'
          }`}
        >
          Ransomware Scenario
        </button>
      </div>
      {scenario === 'ransomware' && (
        <p className="mb-4 font-mono text-xs text-warning">
          Highlighting: T1486 → T1490 → T1083 → T1489 (techniques shown where present in this matrix)
        </p>
      )}

      <div className="overflow-x-auto rounded-lg border border-border-subtle bg-panel p-4">
        <div className="flex min-w-[900px] gap-3">
          {TACTICS.map((tactic, ti) => (
            <div key={tactic.name} className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-xs text-text-muted">{ti + 1}.</span>
                <span className="text-xs font-semibold text-text-primary">{tactic.name}</span>
              </div>
              <div className="flex flex-col gap-2">
                {tactic.techniques.map(t => {
                  const hot = highlight?.has(t.id)
                  const active = selected?.id === t.id && selected?.name === t.name
                  return (
                    <button
                      key={t.id + t.name}
                      type="button"
                      onClick={() => setSelected(t)}
                      className={`rounded border px-2 py-2 text-left transition-colors ${
                        active
                          ? 'border-accent bg-accent/10'
                          : hot
                            ? 'border-danger bg-danger/10'
                            : 'border-border-subtle hover:border-accent/50'
                      }`}
                    >
                      <div className="font-mono text-[10px] text-accent">{t.id}</div>
                      <div className="text-xs text-text-primary">{t.name}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="mt-6 rounded-lg border border-border-subtle bg-panel p-6">
        {selected ? (
          <div>
            <div className="mb-1 font-mono text-sm text-accent">{selected.id}</div>
            <h3 className="mb-3 text-xl font-bold text-text-primary">{selected.name}</h3>
            <p className="mb-4 leading-relaxed text-text-muted">{selected.description}</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded border border-border-subtle p-3">
                <div className="mb-1 font-mono text-xs text-accent">Detection</div>
                <p className="text-sm text-text-muted">{selected.detection}</p>
              </div>
              <div className="rounded border border-border-subtle p-3">
                <div className="mb-1 font-mono text-xs text-accent">Mitigation</div>
                <p className="text-sm text-text-muted">{selected.mitigation}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-text-muted">Click any technique to see its description, detection method, and mitigation.</p>
        )}
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          MITRE ATT&amp;CK is the universal language of threat intelligence. Every technique has a known
          detection method and mitigation — knowing this framework is fundamental to both red and blue
          team work.
        </p>
      </div>
    </div>
  )
}
