// Mock data generator for cybersecurity dashboard
import { subHours, subMinutes, subDays } from 'date-fns';

// Helper to generate random IPs
const generateIP = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

// Generate Agent Metrics
export const mockAgentMetrics = [
  // Email Verification Agent
  { id: 1, agent_name: 'email_verification', metric_name: 'flagged_tickets', metric_value: 5, unit: 'count', status: 'normal', threshold_amber: 50, threshold_red: 100, time_window: '24h', created_date: new Date().toISOString() },
  { id: 2, agent_name: 'email_verification', metric_name: 'human_agreement_rate', metric_value: 89, unit: '%', status: 'normal', threshold_amber: 80, threshold_red: 70, time_window: '24h', created_date: new Date().toISOString() },
  
  // Email Recording Agent
  { id: 3, agent_name: 'email_recording', metric_name: 'data_completeness', metric_value: 99.2, unit: '%', status: 'normal', threshold_amber: 99, threshold_red: 95, time_window: '24h', created_date: new Date().toISOString() },
  { id: 4, agent_name: 'email_recording', metric_name: 'integrity_violations', metric_value: 0, unit: 'count', status: 'normal', threshold_amber: 1, threshold_red: 5, time_window: '24h', created_date: new Date().toISOString() },
  { id: 5, agent_name: 'email_recording', metric_name: 'pii_compliance', metric_value: 100, unit: '%', status: 'normal', threshold_amber: 99, threshold_red: 95, time_window: '24h', created_date: new Date().toISOString() },
  { id: 6, agent_name: 'email_recording', metric_name: 'retention_violations', metric_value: 0, unit: 'count', status: 'normal', threshold_amber: 1, threshold_red: 5, time_window: '24h', created_date: new Date().toISOString() },
  { id: 7, agent_name: 'email_recording', metric_name: 'failed_login_anomalies', metric_value: 2, unit: 'count', status: 'normal', threshold_amber: 5, threshold_red: 10, time_window: '24h', created_date: new Date().toISOString() },
  
  // OT Tracking Agent
  { id: 8, agent_name: 'ot_tracking', metric_name: 'asset_coverage', metric_value: 94.5, unit: '%', status: 'normal', threshold_amber: 90, threshold_red: 80, time_window: '24h', created_date: new Date().toISOString() },
  { id: 9, agent_name: 'ot_tracking', metric_name: 'baseline_deviations', metric_value: 3, unit: 'count', status: 'watch', threshold_amber: 0, threshold_red: 5, time_window: '24h', created_date: new Date().toISOString() },
  { id: 10, agent_name: 'ot_tracking', metric_name: 'unauthorized_flows', metric_value: 0, unit: 'count', status: 'normal', threshold_amber: 1, threshold_red: 3, time_window: '24h', created_date: new Date().toISOString() },
  { id: 11, agent_name: 'ot_tracking', metric_name: 'false_positive_rate', metric_value: 1.2, unit: '%', status: 'normal', threshold_amber: 2, threshold_red: 5, time_window: '24h', created_date: new Date().toISOString() },
  { id: 12, agent_name: 'ot_tracking', metric_name: 'zone_violations', metric_value: 0, unit: 'count', status: 'normal', threshold_amber: 1, threshold_red: 2, time_window: '24h', created_date: new Date().toISOString() },
];

// Generate Security Events
export const mockSecurityEvents = [
  {
    id: 1,
    event_type: 'verification_token_reuse',
    severity: 'high',
    source: 'email_verification_agent',
    description: 'Multiple verification token reuse attempts detected from suspicious IP range',
    details: { ip: '198.51.100.23', count: 5, user_id: 'user@tempmail.net' },
    status: 'open',
    created_date: subHours(new Date(), 2).toISOString()
  },
  {
    id: 2,
    event_type: 'ot_baseline_deviation',
    severity: 'medium',
    source: 'ot_tracking_agent',
    description: 'PLC communication pattern deviated from learned baseline',
    details: { asset: 'PLC-REACTOR-01', protocol: 'modbus', count: 3 },
    status: 'investigating',
    created_date: subHours(new Date(), 4).toISOString()
  },
  {
    id: 3,
    event_type: 'failed_login_burst',
    severity: 'high',
    source: 'email_recording_agent',
    description: 'Rapid failed login attempts detected - possible credential stuffing',
    details: { ip: '203.0.113.45', count: 127 },
    status: 'open',
    created_date: subHours(new Date(), 1).toISOString()
  },
  {
    id: 4,
    event_type: 'vr_ip_burst',
    severity: 'critical',
    source: 'email_verification_agent',
    description: 'IP velocity burst - 50+ verification requests in 2 minutes',
    details: { ip: '203.0.113.67', count: 53 },
    status: 'open',
    created_date: subMinutes(new Date(), 30).toISOString()
  },
  {
    id: 5,
    event_type: 'ot_protocol_anomaly',
    severity: 'medium',
    source: 'ot_tracking_agent',
    description: 'Unusual DNP3 function code observed on critical asset',
    details: { asset: 'RTU-GRID-05', protocol: 'dnp3', count: 1 },
    status: 'resolved',
    resolved_at: subMinutes(new Date(), 15).toISOString(),
    created_date: subHours(new Date(), 6).toISOString()
  },
  {
    id: 6,
    event_type: 'email_bounce_spike',
    severity: 'low',
    source: 'email_verification_agent',
    description: 'Bounce rate spike detected for specific domain',
    details: { count: 15, domain: 'suspicious-corp.biz' },
    status: 'investigating',
    created_date: subHours(new Date(), 8).toISOString()
  },
];

// Generate Data Quality Checks
export const mockDataQualityChecks = [
  {
    id: 1,
    check_type: 'schema_validation',
    table_name: 'email_verifications',
    records_checked: 15234,
    violations_found: 0,
    severity: 'low',
    remediation_status: 'compliant',
    details: { check_description: 'All required fields present and properly typed' },
    created_date: subMinutes(new Date(), 15).toISOString()
  },
  {
    id: 2,
    check_type: 'referential_integrity',
    table_name: 'user_sessions',
    records_checked: 8456,
    violations_found: 2,
    severity: 'medium',
    remediation_status: 'auto_corrected',
    details: { check_description: 'Orphaned session records detected and archived' },
    created_date: subMinutes(new Date(), 45).toISOString()
  },
  {
    id: 3,
    check_type: 'pii_compliance',
    table_name: 'email_logs',
    records_checked: 42150,
    violations_found: 0,
    severity: 'low',
    remediation_status: 'compliant',
    details: { check_description: 'No unauthorized PII fields detected' },
    created_date: subHours(new Date(), 2).toISOString()
  },
  {
    id: 4,
    check_type: 'retention_policy',
    table_name: 'authentication_logs',
    records_checked: 187650,
    violations_found: 12,
    severity: 'medium',
    remediation_status: 'pending_purge',
    details: { check_description: '12 records beyond 365-day retention window' },
    created_date: subHours(new Date(), 4).toISOString()
  },
  {
    id: 5,
    check_type: 'data_completeness',
    table_name: 'email_verifications',
    records_checked: 15234,
    violations_found: 8,
    severity: 'low',
    remediation_status: 'under_review',
    details: { check_description: 'Optional fields missing in 0.05% of records' },
    created_date: subHours(new Date(), 6).toISOString()
  },
];

// Generate OT Assets
export const mockOTAssets = [
  {
    id: 1,
    asset_name: 'PLC-REACTOR-01',
    ip_address: '10.20.1.15',
    mac_address: 'AA:BB:CC:DD:EE:01',
    protocol: 'modbus',
    role: 'controller',
    zone: 'production_zone_1',
    status: 'online',
    baseline_established: true,
    last_seen: new Date().toISOString(),
    firmware_version: 'v2.4.1',
    vendor: 'Schneider Electric'
  },
  {
    id: 2,
    asset_name: 'RTU-GRID-05',
    ip_address: '10.20.1.22',
    mac_address: 'AA:BB:CC:DD:EE:02',
    protocol: 'dnp3',
    role: 'rtu',
    zone: 'transmission_zone',
    status: 'online',
    baseline_established: true,
    last_seen: subMinutes(new Date(), 2).toISOString(),
    firmware_version: 'v1.8.3',
    vendor: 'ABB'
  },
  {
    id: 3,
    asset_name: 'HMI-CONTROL-01',
    ip_address: '10.20.2.10',
    mac_address: 'AA:BB:CC:DD:EE:03',
    protocol: 'modbus',
    role: 'hmi',
    zone: 'control_zone',
    status: 'online',
    baseline_established: true,
    last_seen: subMinutes(new Date(), 1).toISOString(),
    firmware_version: 'v5.2.0',
    vendor: 'Siemens'
  },
  {
    id: 4,
    asset_name: 'PLC-TURBINE-02',
    ip_address: '10.20.1.18',
    mac_address: 'AA:BB:CC:DD:EE:04',
    protocol: 'modbus',
    role: 'controller',
    zone: 'production_zone_2',
    status: 'anomaly_detected',
    baseline_established: true,
    last_seen: subMinutes(new Date(), 5).toISOString(),
    firmware_version: 'v2.4.1',
    vendor: 'Schneider Electric'
  },
  {
    id: 5,
    asset_name: 'SCADA-SERVER-01',
    ip_address: '10.20.2.5',
    mac_address: 'AA:BB:CC:DD:EE:05',
    protocol: 'modbus',
    role: 'server',
    zone: 'control_zone',
    status: 'online',
    baseline_established: true,
    last_seen: subSeconds(new Date(), 30).toISOString(),
    firmware_version: 'v7.1.2',
    vendor: 'Wonderware'
  },
  {
    id: 6,
    asset_name: 'RTU-SUBSTATION-03',
    ip_address: '10.20.1.28',
    mac_address: 'AA:BB:CC:DD:EE:06',
    protocol: 'iec104',
    role: 'rtu',
    zone: 'distribution_zone',
    status: 'online',
    baseline_established: true,
    last_seen: subMinutes(new Date(), 3).toISOString(),
    firmware_version: 'v3.2.5',
    vendor: 'GE Grid Solutions'
  },
  {
    id: 7,
    asset_name: 'PLC-COMPRESSOR-04',
    ip_address: '10.20.1.32',
    mac_address: 'AA:BB:CC:DD:EE:07',
    protocol: 'modbus',
    role: 'controller',
    zone: 'production_zone_1',
    status: 'online',
    baseline_established: true,
    last_seen: subSeconds(new Date(), 45).toISOString(),
    firmware_version: 'v2.3.8',
    vendor: 'Rockwell Automation'
  },
  {
    id: 8,
    asset_name: 'IED-PROTECTION-01',
    ip_address: '10.20.1.40',
    mac_address: 'AA:BB:CC:DD:EE:08',
    protocol: 'iec61850',
    role: 'protection',
    zone: 'protection_zone',
    status: 'online',
    baseline_established: true,
    last_seen: subMinutes(new Date(), 1).toISOString(),
    firmware_version: 'v4.5.1',
    vendor: 'Schweitzer Engineering'
  },
];

// Generate OT Protocol Events
export const mockOTProtocolEvents = [
  {
    id: 1,
    protocol: 'modbus',
    source_asset: 'HMI-CONTROL-01',
    dest_asset: 'PLC-REACTOR-01',
    function_code: 'read_holding_registers',
    is_baseline_deviation: false,
    is_unauthorized: false,
    details: { registers: '40001-40010', success: true },
    created_date: subMinutes(new Date(), 2).toISOString()
  },
  {
    id: 2,
    protocol: 'dnp3',
    source_asset: 'SCADA-SERVER-01',
    dest_asset: 'RTU-GRID-05',
    function_code: 'read_analog_inputs',
    is_baseline_deviation: false,
    is_unauthorized: false,
    details: { points: 12, success: true },
    created_date: subMinutes(new Date(), 5).toISOString()
  },
  {
    id: 3,
    protocol: 'modbus',
    source_asset: 'HMI-CONTROL-01',
    dest_asset: 'PLC-TURBINE-02',
    function_code: 'write_single_register',
    is_baseline_deviation: true,
    is_unauthorized: false,
    details: { register: '40050', value: 1250, reason: 'unusual_timing' },
    created_date: subMinutes(new Date(), 8).toISOString()
  },
  {
    id: 4,
    protocol: 'modbus',
    source_asset: 'SCADA-SERVER-01',
    dest_asset: 'PLC-COMPRESSOR-04',
    function_code: 'read_coils',
    is_baseline_deviation: false,
    is_unauthorized: false,
    details: { coils: '00001-00016', success: true },
    created_date: subMinutes(new Date(), 12).toISOString()
  },
  {
    id: 5,
    protocol: 'iec104',
    source_asset: 'SCADA-SERVER-01',
    dest_asset: 'RTU-SUBSTATION-03',
    function_code: 'interrogation',
    is_baseline_deviation: false,
    is_unauthorized: false,
    details: { cause: 'periodic', success: true },
    created_date: subMinutes(new Date(), 15).toISOString()
  },
  {
    id: 6,
    protocol: 'modbus',
    source_asset: 'HMI-CONTROL-01',
    dest_asset: 'PLC-REACTOR-01',
    function_code: 'read_input_registers',
    is_baseline_deviation: false,
    is_unauthorized: false,
    details: { registers: '30001-30020', success: true },
    created_date: subMinutes(new Date(), 18).toISOString()
  },
];

// Helper function to add subSeconds
function subSeconds(date, seconds) {
  return new Date(date.getTime() - seconds * 1000);
}

// Generate Verification Events (for Email Verification page)
export const mockVerificationEvents = [
  {
    id: 10432,
    description: 'Flagged for token reuse anomaly',
    timestamp: subHours(new Date(), 1),
    confidence: 0.87,
    status: 'pending',
    reasoning: [
      { step: 1, detail: 'Token reuse detected (2x within 10 minutes)' },
      { step: 2, detail: 'IP velocity burst detected (15 requests in 2 min)' },
      { step: 3, detail: 'Domain risk score: HIGH (disposable email domain)' },
      { step: 4, detail: 'Geo mismatch: Previous login US-East, current Romania' }
    ],
    email: 'user@tempmail.net',
    ip: '198.51.100.23',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    geo_location: 'Bucharest, RO',
    device_fingerprint: 'a7f3c9e2d1b5',
    verification_attempts: 3,
    token_age_minutes: 8,
    domain_age_days: 2
  },
  {
    id: 10445,
    description: 'Suspicious verification velocity pattern',
    timestamp: subHours(new Date(), 2),
    confidence: 0.92,
    status: 'pending',
    reasoning: [
      { step: 1, detail: '50+ verification requests from single IP in 5 minutes' },
      { step: 2, detail: 'User-agent rotation detected (bot-like behavior)' },
      { step: 3, detail: 'All requests to newly registered domains (<7 days old)' },
      { step: 4, detail: 'No successful verifications - reconnaissance pattern' }
    ],
    email: 'test@newdomain123.com',
    ip: '203.0.113.67',
    user_agent: 'Python-requests/2.28.0',
    geo_location: 'Frankfurt, DE',
    device_fingerprint: 'rotating',
    verification_attempts: 53,
    token_age_minutes: 3,
    domain_age_days: 4
  },
  {
    id: 10458,
    description: 'DMARC/DKIM failure with high bounce rate',
    timestamp: subHours(new Date(), 3),
    confidence: 0.78,
    status: 'pending',
    reasoning: [
      { step: 1, detail: 'DMARC policy violation detected (SPF and DKIM both failed)' },
      { step: 2, detail: 'DKIM signature validation failed' },
      { step: 3, detail: 'Bounce rate for this domain: 45% (threshold: 10%)' },
      { step: 4, detail: 'Domain reputation score: 2.1/10 (poor)' }
    ],
    email: 'admin@suspicious-corp.biz',
    ip: '192.0.2.89',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    geo_location: 'Lagos, NG',
    device_fingerprint: '9e4f2a1c8d3b',
    verification_attempts: 1,
    token_age_minutes: 122,
    domain_age_days: 45
  },
  {
    id: 10471,
    description: 'Token brute-force attempt detected',
    timestamp: subHours(new Date(), 4),
    confidence: 0.95,
    status: 'confirmed_threat',
    reasoning: [
      { step: 1, detail: 'Sequential token guessing pattern detected (enumeration attack)' },
      { step: 2, detail: '120 failed confirmation attempts in 10 minutes' },
      { step: 3, detail: 'Source IP on known botnet list (Mirai variant)' },
      { step: 4, detail: 'Rate limiting triggered - source blocked' }
    ],
    email: 'victim@company.com',
    ip: '198.51.100.142',
    user_agent: 'curl/7.68.0',
    geo_location: 'Unknown (Tor Exit)',
    device_fingerprint: 'unknown',
    verification_attempts: 120,
    token_age_minutes: 15,
    domain_age_days: 1825
  },
  {
    id: 10489,
    description: 'Expired token reuse with geo anomaly',
    timestamp: subHours(new Date(), 5),
    confidence: 0.83,
    status: 'pending',
    reasoning: [
      { step: 1, detail: 'Verification token expired 48 hours ago' },
      { step: 2, detail: 'Reuse attempt from different country (CN vs US)' },
      { step: 3, detail: 'Device fingerprint mismatch (different browser/OS)' },
      { step: 4, detail: 'Account shows prior compromise indicators' }
    ],
    email: 'user@legitimate.com',
    ip: '198.18.0.45',
    user_agent: 'Mozilla/5.0 (X11; Linux x86_64)',
    geo_location: 'Shanghai, CN',
    device_fingerprint: '3c8e9f4a2d1b',
    verification_attempts: 2,
    token_age_minutes: 2880,
    domain_age_days: 3650
  },
  {
    id: 10501,
    description: 'Rate limit bypass attempt detected',
    timestamp: subHours(new Date(), 6),
    confidence: 0.89,
    status: 'pending',
    reasoning: [
      { step: 1, detail: 'Multiple requests from /24 subnet (distributed attack)' },
      { step: 2, detail: 'X-Forwarded-For header manipulation detected' },
      { step: 3, detail: 'Request timing suggests automated tool (Burp/ZAP)' }
    ],
    email: 'target@service.io',
    ip: '203.0.113.0',
    user_agent: 'Mozilla/5.0 (compatible; MSIE 10.0)',
    geo_location: 'Multiple (VPN Pool)',
    device_fingerprint: 'spoofed',
    verification_attempts: 8,
    token_age_minutes: 5,
    domain_age_days: 730
  },
];

// Compliance Checks
export const mockComplianceChecks = [
  { id: 1, check_name: 'GDPR Data Retention', status: 'passing', last_run: subHours(new Date(), 2).toISOString() },
  { id: 2, check_name: 'SOC 2 Access Controls', status: 'passing', last_run: subHours(new Date(), 4).toISOString() },
  { id: 3, check_name: 'NERC CIP Asset Tracking', status: 'passing', last_run: subHours(new Date(), 1).toISOString() },
  { id: 4, check_name: 'ISO 27001 Logging', status: 'warning', last_run: subHours(new Date(), 6).toISOString() },
];
