// Mock API client for demonstration
const mockData = {
  AgentMetric: [
    { id: 1, agent_name: 'email_verification', metric_name: 'flagged_tickets', metric_value: 5, status: 'normal', created_date: new Date().toISOString() },
    { id: 2, agent_name: 'email_verification', metric_name: 'human_agreement_rate', metric_value: 89, status: 'normal', created_date: new Date().toISOString() },
    { id: 3, agent_name: 'email_recording', metric_name: 'data_integrity_violations', metric_value: 0, status: 'normal', created_date: new Date().toISOString() },
    { id: 4, agent_name: 'email_recording', metric_name: 'pii_exposure_events', metric_value: 2, status: 'watch', created_date: new Date().toISOString() },
    { id: 5, agent_name: 'ot_tracking', metric_name: 'asset_coverage', metric_value: 94, status: 'normal', created_date: new Date().toISOString() },
    { id: 6, agent_name: 'ot_tracking', metric_name: 'baseline_deviations', metric_value: 3, status: 'watch', created_date: new Date().toISOString() },
    { id: 7, agent_name: 'ot_tracking', metric_name: 'unauthorized_flows', metric_value: 0, status: 'normal', created_date: new Date().toISOString() },
    { id: 8, agent_name: 'ot_tracking', metric_name: 'false_positive_rate', metric_value: 1.2, status: 'normal', created_date: new Date().toISOString() },
    { id: 9, agent_name: 'ot_tracking', metric_name: 'zone_violations', metric_value: 1, status: 'action', created_date: new Date().toISOString() },
  ],
  SecurityEvent: [
    {
      id: 1,
      event_type: 'verification_token_reuse',
      severity: 'high',
      source: 'email_verification_agent',
      description: 'Multiple verification token reuse attempts detected from suspicious IP - potential credential stuffing attack',
      status: 'open',
      created_date: new Date(Date.now() - 3600000).toISOString(),
      details: { ip: '198.51.100.23', count: 15, user_agent: 'automated_bot', geo_location: 'Romania' }
    },
    {
      id: 2,
      event_type: 'ot_baseline_deviation',
      severity: 'critical',
      source: 'ot_tracking_agent',
      description: 'Unusual Modbus function code sequence detected - potential lateral movement or reconnaissance',
      status: 'investigating',
      created_date: new Date(Date.now() - 7200000).toISOString(),
      details: { asset: 'HMI-1', protocol: 'modbus', function_codes: '01,02,03,04,05,06', baseline_deviation: '400%' }
    },
    {
      id: 3,
      event_type: 'unauthorized_ot_flow',
      severity: 'critical',
      source: 'ot_tracking_agent',
      description: 'Engineering station attempting unauthorized write operations to production PLC during off-hours',
      status: 'open',
      created_date: new Date(Date.now() - 10800000).toISOString(),
      details: { asset: 'ENG-STATION-2', target: 'PLC-MAIN', protocol: 'opcua', operation: 'write', time: '02:15 AM' }
    },
    {
      id: 4,
      event_type: 'data_integrity_violation',
      severity: 'medium',
      source: 'email_recording_agent',
      description: 'Email content hash mismatch detected - possible tampering or corruption during transit',
      status: 'resolved',
      created_date: new Date(Date.now() - 14400000).toISOString(),
      details: { user_id: 'user@company.com', hash_expected: 'sha256:abc123...', hash_actual: 'sha256:def456...' }
    },
    {
      id: 5,
      event_type: 'vr_ip_burst',
      severity: 'high',
      source: 'email_verification_agent',
      description: 'Verification request velocity spike from single IP - 200+ requests in 5 minutes',
      status: 'open',
      created_date: new Date(Date.now() - 1800000).toISOString(),
      details: { ip: '203.0.113.67', count: 247, time_window: '5min', domains: 'newly_registered' }
    },
    {
      id: 6,
      event_type: 'ot_protocol_anomaly',
      severity: 'high',
      source: 'ot_tracking_agent',
      description: 'DNP3 protocol anomaly detected - malformed packets potentially indicating attack attempt',
      status: 'investigating',
      created_date: new Date(Date.now() - 5400000).toISOString(),
      details: { asset: 'RTU-FIELD-1', protocol: 'dnp3', anomaly_type: 'malformed_header', packet_count: 42 }
    },
    {
      id: 7,
      event_type: 'email_bounce_spike',
      severity: 'medium',
      source: 'email_recording_agent',
      description: 'Unusual email bounce rate detected from external domain - potential phishing campaign',
      status: 'open',
      created_date: new Date(Date.now() - 9000000).toISOString(),
      details: { domain: 'suspicious-corp.biz', bounce_rate: '45%', threshold: '10%', campaign_size: 1200 }
    }
  ],
  OTAsset: [
    {
      id: 1,
      asset_name: 'HMI-1',
      ip_address: '192.168.1.10',
      mac_address: '00:1A:2B:3C:4D:5E',
      role: 'hmi',
      protocol: 'modbus',
      zone: 'Zone 1',
      status: 'online',
      last_seen: new Date().toISOString(),
      baseline_established: true
    },
    {
      id: 2,
      asset_name: 'PLC-MAIN',
      ip_address: '192.168.1.20',
      mac_address: '00:1A:2B:3C:4D:5F',
      role: 'plc',
      protocol: 'modbus',
      zone: 'Zone 1',
      status: 'online',
      last_seen: new Date().toISOString(),
      baseline_established: true
    },
    {
      id: 3,
      asset_name: 'RTU-FIELD-1',
      ip_address: '192.168.2.15',
      mac_address: '00:1A:2B:3C:4D:60',
      role: 'rtu',
      protocol: 'dnp3',
      zone: 'Zone 2',
      status: 'anomaly_detected',
      last_seen: new Date(Date.now() - 300000).toISOString(),
      baseline_established: true
    },
    {
      id: 4,
      asset_name: 'HISTORIAN-DB',
      ip_address: '192.168.1.50',
      mac_address: '00:1A:2B:3C:4D:61',
      role: 'historian',
      protocol: 'opcua',
      zone: 'DMZ',
      status: 'online',
      last_seen: new Date().toISOString(),
      baseline_established: true
    },
    {
      id: 5,
      asset_name: 'ENG-STATION-2',
      ip_address: '192.168.1.100',
      mac_address: '00:1A:2B:3C:4D:62',
      role: 'engineering_station',
      protocol: 'opcua',
      zone: 'Zone 1',
      status: 'online',
      last_seen: new Date().toISOString(),
      baseline_established: false
    }
  ],
  OTProtocolEvent: [
    {
      id: 1,
      protocol: 'modbus',
      source_asset: 'HMI-1',
      dest_asset: 'PLC-MAIN',
      function_code: '03',
      is_baseline_deviation: false,
      is_unauthorized: false,
      created_date: new Date(Date.now() - 60000).toISOString()
    },
    {
      id: 2,
      protocol: 'dnp3',
      source_asset: 'RTU-FIELD-1',
      dest_asset: 'HISTORIAN-DB',
      function_code: '129',
      is_baseline_deviation: true,
      is_unauthorized: false,
      created_date: new Date(Date.now() - 120000).toISOString()
    },
    {
      id: 3,
      protocol: 'opcua',
      source_asset: 'ENG-STATION-2',
      dest_asset: 'PLC-MAIN',
      function_code: 'Write',
      is_baseline_deviation: false,
      is_unauthorized: true,
      created_date: new Date(Date.now() - 180000).toISOString()
    }
  ]
};

export const base44 = {
  entities: {
    AgentMetric: {
      list: (sort = "-created_date", limit = null) => {
        return Promise.resolve(mockData.AgentMetric.slice(0, limit || mockData.AgentMetric.length));
      },
      filter: (filters, sort = "-created_date") => {
        let filtered = mockData.AgentMetric;
        if (filters.agent_name) {
          filtered = filtered.filter(item => item.agent_name === filters.agent_name);
        }
        return Promise.resolve(filtered);
      }
    },
    SecurityEvent: {
      list: (sort = "-created_date", limit = null) => {
        return Promise.resolve(mockData.SecurityEvent.slice(0, limit || mockData.SecurityEvent.length));
      }
    },
    OTAsset: {
      list: (sort = "-last_seen", limit = null) => {
        return Promise.resolve(mockData.OTAsset.slice(0, limit || mockData.OTAsset.length));
      }
    },
    OTProtocolEvent: {
      list: (sort = "-created_date", limit = null) => {
        return Promise.resolve(mockData.OTProtocolEvent.slice(0, limit || mockData.OTProtocolEvent.length));
      }
    }
  }
};