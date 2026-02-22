/**
 * @arcanea/security — SecurityManager
 *
 * Core security orchestrator for the Arcanea Intelligence OS.
 * Maps to Lyssandria (Earth Gate, Foundation, 174 Hz).
 *
 * Manages security scans, incidents, policies, and computes
 * a composite security score. Emits events for all state transitions.
 *
 * Absorbed from arcanea-flow's enterprise SecurityManager,
 * stripped of filesystem persistence for pure in-memory operation,
 * and integrated with the Guardian system.
 */

import { EventEmitter } from 'events';
import type {
  SecurityScan,
  SecurityFinding,
  SecurityIncident,
  SecurityPolicy,
  SecurityRule,
  SecuritySeverity,
  ScanConfig,
  ScanStatus,
  IncidentResolution,
  AuditEntry,
  SecurityScore,
} from './types.js';

/** Default scanner mapping per scan type */
const DEFAULT_SCANNERS: Record<string, string> = {
  vulnerability: 'trivy',
  dependency: 'npm-audit',
  'code-quality': 'sonarqube',
  secrets: 'gitleaks',
  compliance: 'inspec',
  infrastructure: 'checkov',
  container: 'clair',
};

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export class SecurityManager extends EventEmitter {
  private scans: Map<string, SecurityScan> = new Map();
  private incidents: Map<string, SecurityIncident> = new Map();
  private policies: Map<string, SecurityPolicy> = new Map();

  constructor() {
    super();
  }

  // ===========================================================================
  // Scans
  // ===========================================================================

  /**
   * Create a new security scan in 'pending' state.
   * Emits: scan.created
   */
  createScan(config: ScanConfig): SecurityScan {
    const scan: SecurityScan = {
      id: generateId('scan'),
      name: config.name,
      type: config.type,
      status: 'pending',
      target: config.target,
      configuration: {
        scanner: config.configuration?.scanner ?? DEFAULT_SCANNERS[config.type] ?? 'generic',
        rules: config.configuration?.rules ?? [],
        excludes: config.configuration?.excludes ?? [],
        severity: config.configuration?.severity ?? ['critical', 'high', 'medium', 'low', 'info'],
      },
      results: [],
      metrics: {
        totalFindings: 0,
        criticalFindings: 0,
        highFindings: 0,
        mediumFindings: 0,
        lowFindings: 0,
        infoFindings: 0,
        scanDuration: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'system',
      auditLog: [],
    };

    this.addAuditEntry(scan, 'system', 'scan_created', 'scan', {
      scanId: scan.id,
      scanType: scan.type,
    });

    this.scans.set(scan.id, scan);
    this.emit('scan.created', scan);

    return scan;
  }

  /**
   * Execute a pending scan. Transitions status through
   * running -> completed|failed. Emits scan.started, scan.completed.
   *
   * In the real world, this would invoke the actual scanner binary.
   * Here it accepts an optional findings array for testability,
   * or produces an empty result set.
   */
  executeScan(
    scanId: string,
    findings?: SecurityFinding[],
  ): SecurityScan {
    const scan = this.scans.get(scanId);
    if (!scan) {
      throw new Error(`Scan not found: ${scanId}`);
    }
    if (scan.status !== 'pending') {
      throw new Error(`Scan ${scanId} is not in pending status (current: ${scan.status})`);
    }

    // Transition to running
    scan.status = 'running';
    scan.updatedAt = new Date();
    this.emit('scan.started', scan);

    const startTime = Date.now();

    try {
      // Apply findings
      scan.results = findings ?? [];
      scan.status = 'completed';
      scan.metrics.scanDuration = Date.now() - startTime;

      // Calculate metrics from results
      this.calculateScanMetrics(scan);

      this.addAuditEntry(scan, 'system', 'scan_completed', 'scan', {
        scanId,
        findingsCount: scan.results.length,
        duration: scan.metrics.scanDuration,
      });

      scan.updatedAt = new Date();
      this.emit('scan.completed', scan);

      return scan;
    } catch (error) {
      scan.status = 'failed';
      scan.updatedAt = new Date();

      this.addAuditEntry(scan, 'system', 'scan_failed', 'scan', {
        scanId,
        error: error instanceof Error ? error.message : String(error),
      });

      this.emit('scan.failed', { scan, error });
      throw error;
    }
  }

  /**
   * Get a scan by ID.
   */
  getScan(scanId: string): SecurityScan | undefined {
    return this.scans.get(scanId);
  }

  /**
   * Get all scans, optionally filtered by status.
   */
  getScans(status?: ScanStatus): SecurityScan[] {
    const all = Array.from(this.scans.values());
    return status ? all.filter((s) => s.status === status) : all;
  }

  // ===========================================================================
  // Incidents
  // ===========================================================================

  /**
   * Create a new security incident.
   * Emits: incident.created
   */
  createIncident(data: {
    title: string;
    description: string;
    severity: SecuritySeverity;
    type: SecurityIncident['type'];
    source: SecurityIncident['source'];
    affected?: Partial<SecurityIncident['affected']>;
  }): SecurityIncident {
    const incident: SecurityIncident = {
      id: generateId('incident'),
      title: data.title,
      description: data.description,
      severity: data.severity,
      status: 'open',
      type: data.type,
      source: data.source,
      affected: {
        systems: [],
        data: [],
        users: [],
        ...data.affected,
      },
      timeline: {
        detected: new Date(),
        reported: new Date(),
        acknowledged: new Date(),
      },
      rootCause: {
        primary: '',
        contributing: [],
        analysis: '',
      },
      remediation: {
        immediate: [],
        shortTerm: [],
        longTerm: [],
        preventive: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'system',
      auditLog: [],
    };

    this.addAuditEntry(incident, 'system', 'incident_created', 'incident', {
      incidentId: incident.id,
      severity: incident.severity,
      type: incident.type,
    });

    this.incidents.set(incident.id, incident);
    this.emit('incident.created', incident);

    return incident;
  }

  /**
   * Resolve an incident with root cause analysis.
   * Emits: incident.resolved
   */
  resolveIncident(
    incidentId: string,
    resolution: IncidentResolution,
  ): SecurityIncident {
    const incident = this.incidents.get(incidentId);
    if (!incident) {
      throw new Error(`Incident not found: ${incidentId}`);
    }

    incident.status = 'resolved';
    incident.rootCause = {
      primary: resolution.rootCause,
      contributing: resolution.contributing ?? [],
      analysis: resolution.analysis ?? '',
    };

    if (resolution.remediation) {
      incident.remediation = {
        immediate: resolution.remediation.immediate ?? incident.remediation.immediate,
        shortTerm: resolution.remediation.shortTerm ?? incident.remediation.shortTerm,
        longTerm: resolution.remediation.longTerm ?? incident.remediation.longTerm,
        preventive: resolution.remediation.preventive ?? incident.remediation.preventive,
      };
    }

    incident.timeline.resolved = new Date();
    incident.updatedAt = new Date();

    this.addAuditEntry(incident, 'system', 'incident_resolved', 'incident', {
      incidentId,
      rootCause: resolution.rootCause,
    });

    this.emit('incident.resolved', incident);

    return incident;
  }

  /**
   * Get an incident by ID.
   */
  getIncident(incidentId: string): SecurityIncident | undefined {
    return this.incidents.get(incidentId);
  }

  /**
   * Get all incidents, optionally filtered by status.
   */
  getIncidents(
    status?: SecurityIncident['status'],
  ): SecurityIncident[] {
    const all = Array.from(this.incidents.values());
    return status ? all.filter((i) => i.status === status) : all;
  }

  // ===========================================================================
  // Policies
  // ===========================================================================

  /**
   * Create a new security policy in 'draft' state.
   * Emits: policy.created
   */
  createPolicy(data: {
    name: string;
    description: string;
    type: SecurityPolicy['type'];
    rules: Omit<SecurityRule, 'id'>[];
    enforcement?: Partial<SecurityPolicy['enforcement']>;
    applicability?: Partial<SecurityPolicy['applicability']>;
  }): SecurityPolicy {
    const policy: SecurityPolicy = {
      id: generateId('policy'),
      name: data.name,
      description: data.description,
      type: data.type,
      version: '1.0.0',
      status: 'draft',
      rules: data.rules.map((rule) => ({
        id: generateId('rule'),
        ...rule,
      })),
      enforcement: {
        level: 'warning',
        exceptions: [],
        approvers: [],
        ...data.enforcement,
      },
      applicability: {
        projects: [],
        environments: [],
        resources: [],
        ...data.applicability,
      },
      metrics: {
        violations: 0,
        compliance: 100,
        exceptions: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'system',
    };

    this.policies.set(policy.id, policy);
    this.emit('policy.created', policy);

    return policy;
  }

  /**
   * Get a policy by ID.
   */
  getPolicy(policyId: string): SecurityPolicy | undefined {
    return this.policies.get(policyId);
  }

  /**
   * Get all policies, optionally filtered by status.
   */
  getPolicies(
    status?: SecurityPolicy['status'],
  ): SecurityPolicy[] {
    const all = Array.from(this.policies.values());
    return status ? all.filter((p) => p.status === status) : all;
  }

  // ===========================================================================
  // Security Score
  // ===========================================================================

  /**
   * Compute a composite security score (0-10) across all
   * scans, incidents, and policies. Maps to Lyssandria's
   * Guardian assessment.
   */
  getSecurityScore(): SecurityScore {
    const scans = Array.from(this.scans.values());
    const incidents = Array.from(this.incidents.values());
    const policies = Array.from(this.policies.values());

    // Scan score: penalize for open critical/high findings
    let scanScore = 10;
    const completedScans = scans.filter((s) => s.status === 'completed');
    for (const scan of completedScans) {
      scanScore -= scan.metrics.criticalFindings * 2;
      scanScore -= scan.metrics.highFindings * 1;
      scanScore -= scan.metrics.mediumFindings * 0.3;
      scanScore -= scan.metrics.lowFindings * 0.1;
    }
    scanScore = Math.max(0, Math.min(10, scanScore));

    // Incident score: penalize for open incidents
    let incidentScore = 10;
    const openIncidents = incidents.filter(
      (i) => i.status === 'open' || i.status === 'investigating',
    );
    for (const incident of openIncidents) {
      switch (incident.severity) {
        case 'critical':
          incidentScore -= 3;
          break;
        case 'high':
          incidentScore -= 2;
          break;
        case 'medium':
          incidentScore -= 1;
          break;
        case 'low':
          incidentScore -= 0.5;
          break;
        default:
          incidentScore -= 0.1;
      }
    }
    incidentScore = Math.max(0, Math.min(10, incidentScore));

    // Policy score: reward active policies, penalize violations
    let policyScore = 10;
    if (policies.length === 0) {
      policyScore = 5; // No policies = neutral
    } else {
      const activePolicies = policies.filter((p) => p.status === 'active');
      const activeRatio = activePolicies.length / policies.length;
      const totalViolations = policies.reduce(
        (sum, p) => sum + p.metrics.violations,
        0,
      );
      policyScore = activeRatio * 10 - totalViolations * 0.5;
    }
    policyScore = Math.max(0, Math.min(10, policyScore));

    // Finding score: based on current unresolved findings
    let findingScore = 10;
    const allFindings = completedScans.flatMap((s) => s.results);
    const openFindings = allFindings.filter(
      (f) => f.status === 'open' || f.status === 'triaged',
    );
    for (const finding of openFindings) {
      switch (finding.severity) {
        case 'critical':
          findingScore -= 2;
          break;
        case 'high':
          findingScore -= 1;
          break;
        case 'medium':
          findingScore -= 0.3;
          break;
        case 'low':
          findingScore -= 0.1;
          break;
        default:
          findingScore -= 0.05;
      }
    }
    findingScore = Math.max(0, Math.min(10, findingScore));

    // Overall: weighted average
    const overall = Number(
      (
        scanScore * 0.3 +
        incidentScore * 0.3 +
        policyScore * 0.2 +
        findingScore * 0.2
      ).toFixed(1),
    );

    // Grade mapping
    let grade: SecurityScore['grade'];
    if (overall >= 9) grade = 'A';
    else if (overall >= 7) grade = 'B';
    else if (overall >= 5) grade = 'C';
    else if (overall >= 3) grade = 'D';
    else grade = 'F';

    return {
      overall,
      breakdown: {
        scans: Number(scanScore.toFixed(1)),
        incidents: Number(incidentScore.toFixed(1)),
        policies: Number(policyScore.toFixed(1)),
        findings: Number(findingScore.toFixed(1)),
      },
      grade,
      guardian: 'Lyssandria',
      gate: 'Foundation',
      frequency: 174,
    };
  }

  // ===========================================================================
  // Private Helpers
  // ===========================================================================

  private calculateScanMetrics(scan: SecurityScan): void {
    const findings = scan.results;
    scan.metrics.totalFindings = findings.length;
    scan.metrics.criticalFindings = findings.filter((f) => f.severity === 'critical').length;
    scan.metrics.highFindings = findings.filter((f) => f.severity === 'high').length;
    scan.metrics.mediumFindings = findings.filter((f) => f.severity === 'medium').length;
    scan.metrics.lowFindings = findings.filter((f) => f.severity === 'low').length;
    scan.metrics.infoFindings = findings.filter((f) => f.severity === 'info').length;
  }

  private addAuditEntry(
    target: { auditLog: AuditEntry[] },
    userId: string,
    action: string,
    targetType: string,
    details: Record<string, unknown>,
  ): void {
    target.auditLog.push({
      id: generateId('audit'),
      timestamp: new Date(),
      userId,
      action,
      target: targetType,
      details,
    });
  }
}
