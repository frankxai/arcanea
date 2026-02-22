/**
 * @arcanea/security
 *
 * Security module for the Arcanea Intelligence OS.
 * Mapped to Lyssandria — Earth Gate Guardian, Foundation, 174 Hz.
 *
 * Provides:
 * - SecurityManager: Scan/incident/policy orchestration
 * - PermissionManager: 4-level hierarchical permission resolution
 * - InputValidator: String validation with safe patterns
 * - PathValidator: Path traversal prevention
 * - SafeExecutor: Command injection protection
 *
 * Absorbed from arcanea-flow's enterprise security layer,
 * adapted for the Arcanea monorepo's Guardian architecture.
 */

// Re-export all types
export type {
  // Severity & Risk
  SecuritySeverity,
  RiskLevel,

  // Findings
  SecurityFinding,

  // Scans
  ScanType,
  ScanStatus,
  ScanConfig,
  SecurityScan,

  // Incidents
  IncidentStatus,
  IncidentType,
  SecurityIncident,
  IncidentResolution,

  // Policies
  PolicyType,
  SecurityRule,
  SecurityPolicy,

  // Audit
  AuditEntry,

  // Permissions
  PermissionLevel,
  PermissionBehavior,
  PermissionRule,
  PermissionConfig,
  PermissionQuery,
  PermissionResolution,
  PermissionUpdate,

  // Validation
  StringValidationOptions,
  ValidationResult,
  PathValidationResult,

  // Execution
  CommandAssessment,
  ExecutionOptions,
  ExecutionResult,

  // Score
  SecurityScore,
} from './types.js';

// Re-export classes
export { SecurityManager } from './security-manager.js';
export { PermissionManager } from './permission-manager.js';
export { InputValidator } from './input-validator.js';
export { PathValidator } from './path-validator.js';
export { SafeExecutor } from './safe-executor.js';
