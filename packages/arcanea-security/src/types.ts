/**
 * @arcanea/security — Type Definitions
 *
 * Lyssandria's Earth Gate: Foundation, stability, protection.
 * All security type interfaces for the Arcanea Intelligence OS.
 *
 * Absorbed from arcanea-flow SecurityManager + PermissionManager,
 * adapted for the Arcanea monorepo's Guardian-mapped architecture.
 */

// =============================================================================
// Severity & Risk
// =============================================================================

/** Security severity levels, mapped to Guardian urgency tiers */
export type SecuritySeverity = 'info' | 'low' | 'medium' | 'high' | 'critical';

/** Risk level for command execution assessment */
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

// =============================================================================
// Security Findings
// =============================================================================

export interface SecurityFinding {
  id: string;
  title: string;
  description: string;
  severity: SecuritySeverity;
  category:
    | 'vulnerability'
    | 'secret'
    | 'misconfiguration'
    | 'compliance'
    | 'code-quality'
    | 'license';
  cwe?: string;
  cve?: string;
  cvss?: {
    score: number;
    vector: string;
    version: string;
  };
  location: {
    file: string;
    line?: number;
    column?: number;
    function?: string;
    component?: string;
  };
  evidence: {
    snippet?: string;
    context?: string;
    references?: string[];
  };
  impact: string;
  remediation: {
    description: string;
    effort: 'low' | 'medium' | 'high';
    priority: 'low' | 'medium' | 'high' | 'critical';
    autoFixable: boolean;
    steps: string[];
    references: string[];
  };
  status:
    | 'open'
    | 'triaged'
    | 'in-progress'
    | 'resolved'
    | 'suppressed'
    | 'false-positive';
  assignedTo?: string;
  dueDate?: Date;
  tags: string[];
  metadata: Record<string, unknown>;
  firstSeen: Date;
  lastSeen: Date;
  occurrences: number;
}

// =============================================================================
// Security Scans
// =============================================================================

export type ScanType =
  | 'vulnerability'
  | 'dependency'
  | 'code-quality'
  | 'secrets'
  | 'compliance'
  | 'infrastructure'
  | 'container';

export type ScanStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface ScanConfig {
  name: string;
  type: ScanType;
  target: {
    type:
      | 'repository'
      | 'container'
      | 'infrastructure'
      | 'application'
      | 'dependencies';
    path: string;
    branch?: string;
    commit?: string;
  };
  configuration?: {
    scanner?: string;
    rules?: string[];
    excludes?: string[];
    severity?: SecuritySeverity[];
  };
}

export interface SecurityScan {
  id: string;
  name: string;
  type: ScanType;
  status: ScanStatus;
  target: ScanConfig['target'];
  configuration: {
    scanner: string;
    rules: string[];
    excludes: string[];
    severity: SecuritySeverity[];
  };
  results: SecurityFinding[];
  metrics: {
    totalFindings: number;
    criticalFindings: number;
    highFindings: number;
    mediumFindings: number;
    lowFindings: number;
    infoFindings: number;
    scanDuration: number;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  auditLog: AuditEntry[];
}

// =============================================================================
// Security Incidents
// =============================================================================

export type IncidentStatus =
  | 'open'
  | 'investigating'
  | 'contained'
  | 'resolved'
  | 'closed';

export type IncidentType =
  | 'security-breach'
  | 'vulnerability-exploit'
  | 'policy-violation'
  | 'suspicious-activity'
  | 'compliance-violation';

export interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  severity: SecuritySeverity;
  status: IncidentStatus;
  type: IncidentType;
  source: {
    type: 'scan' | 'alert' | 'user-report' | 'automated-detection';
    details: Record<string, unknown>;
  };
  affected: {
    systems: string[];
    data: string[];
    users: string[];
  };
  timeline: {
    detected: Date;
    reported: Date;
    acknowledged: Date;
    contained?: Date;
    resolved?: Date;
    closed?: Date;
  };
  rootCause: {
    primary: string;
    contributing: string[];
    analysis: string;
  };
  remediation: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
    preventive: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  auditLog: AuditEntry[];
}

export interface IncidentResolution {
  rootCause: string;
  contributing?: string[];
  analysis?: string;
  remediation?: {
    immediate?: string[];
    shortTerm?: string[];
    longTerm?: string[];
    preventive?: string[];
  };
}

// =============================================================================
// Security Policies
// =============================================================================

export type PolicyType =
  | 'scanning'
  | 'access-control'
  | 'compliance'
  | 'incident-response'
  | 'data-protection';

export interface SecurityRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: 'allow' | 'deny' | 'alert' | 'audit';
  severity: SecuritySeverity;
  parameters: Record<string, unknown>;
  enabled: boolean;
}

export interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  type: PolicyType;
  version: string;
  status: 'draft' | 'active' | 'deprecated';
  rules: SecurityRule[];
  enforcement: {
    level: 'advisory' | 'warning' | 'blocking';
    exceptions: string[];
    approvers: string[];
  };
  applicability: {
    projects: string[];
    environments: string[];
    resources: string[];
  };
  metrics: {
    violations: number;
    compliance: number;
    exceptions: number;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// =============================================================================
// Audit Entries
// =============================================================================

export interface AuditEntry {
  id: string;
  timestamp: Date;
  userId: string;
  action: string;
  target: string;
  details: Record<string, unknown>;
}

// =============================================================================
// Permissions (4-Level Hierarchical)
// =============================================================================

/** Permission levels in resolution order: SESSION (highest) -> USER (lowest) */
export type PermissionLevel = 'session' | 'local' | 'project' | 'user';

/** What the permission resolver decides */
export type PermissionBehavior = 'allow' | 'deny' | 'ask';

export interface PermissionRule {
  toolName: string;
  ruleContent?: string;
  behavior: PermissionBehavior;
  scope: PermissionLevel;
  priority: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface PermissionConfig {
  mode: 'default' | 'acceptEdits' | 'bypassPermissions' | 'plan';
  rules: PermissionRule[];
  allowedDirectories: string[];
  deniedDirectories: string[];
  metadata?: Record<string, unknown>;
}

export interface PermissionQuery {
  toolName: string;
  toolInput?: Record<string, unknown>;
  context?: {
    sessionId?: string;
    workingDir?: string;
    agentType?: string;
  };
}

export interface PermissionResolution {
  behavior: PermissionBehavior;
  level: PermissionLevel;
  rule?: PermissionRule;
  fallbackChain: PermissionLevel[];
  cached: boolean;
  resolutionTime: number;
}

export interface PermissionUpdate {
  type:
    | 'addRules'
    | 'replaceRules'
    | 'removeRules'
    | 'setMode'
    | 'addDirectories'
    | 'removeDirectories';
  rules?: Array<{ toolName: string; ruleContent?: string }>;
  behavior?: PermissionBehavior;
  mode?: PermissionConfig['mode'];
  directories?: string[];
}

// =============================================================================
// Input Validation
// =============================================================================

export interface StringValidationOptions {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  allowedChars?: RegExp;
  disallowedPatterns?: RegExp[];
  trim?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  sanitized?: string;
  errors: string[];
  warnings: string[];
}

// =============================================================================
// Path Validation
// =============================================================================

export interface PathValidationResult {
  valid: boolean;
  normalized?: string;
  errors: string[];
  blocked: boolean;
  reason?: string;
}

// =============================================================================
// Safe Execution
// =============================================================================

export interface CommandAssessment {
  command: string;
  safe: boolean;
  risk: RiskLevel;
  reasons: string[];
  blocked: boolean;
  matchedPattern?: string;
}

export interface ExecutionOptions {
  timeout?: number;
  cwd?: string;
  env?: Record<string, string>;
  maxOutputSize?: number;
  allowedCommands?: string[];
}

export interface ExecutionResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  timedOut: boolean;
  duration: number;
}

// =============================================================================
// Security Score
// =============================================================================

export interface SecurityScore {
  overall: number;
  breakdown: {
    scans: number;
    incidents: number;
    policies: number;
    findings: number;
  };
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  guardian: 'Lyssandria';
  gate: 'Foundation';
  frequency: 174;
}
