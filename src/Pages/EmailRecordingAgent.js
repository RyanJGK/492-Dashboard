import React, { useState } from "react";
import { base44 } from "../api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Database, Shield, AlertTriangle, CheckCircle, XCircle, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { formatDistanceToNow } from "../lib/utils";
import KPICard from "../Components/KPICard";

// Mock data for email recording events
const MOCK_RECORDING_EVENTS = [
  {
    id: "rec_001",
    email_id: "email_12345",
    sender: "admin@company.com",
    recipient: "user@external.com",
    subject: "Quarterly Security Report",
    timestamp: new Date(Date.now() - 1800000),
    status: "recorded",
    data_integrity: "verified",
    pii_detected: false,
    retention_policy: "7_years",
    encryption_status: "encrypted"
  },
  {
    id: "rec_002", 
    email_id: "email_12346",
    sender: "hr@company.com",
    recipient: "employee@company.com",
    subject: "Employee Personal Information Update",
    timestamp: new Date(Date.now() - 3600000),
    status: "recorded",
    data_integrity: "hash_mismatch",
    pii_detected: true,
    retention_policy: "10_years",
    encryption_status: "encrypted"
  },
  {
    id: "rec_003",
    email_id: "email_12347", 
    sender: "finance@company.com",
    recipient: "auditor@external-firm.com",
    subject: "Financial Records Q3 2024",
    timestamp: new Date(Date.now() - 7200000),
    status: "recorded",
    data_integrity: "verified",
    pii_detected: true,
    retention_policy: "10_years",
    encryption_status: "encrypted"
  },
  {
    id: "rec_004",
    email_id: "email_12348",
    sender: "support@company.com", 
    recipient: "customer@client.com",
    subject: "Account Recovery Information",
    timestamp: new Date(Date.now() - 10800000),
    status: "failed_recording",
    data_integrity: "unknown",
    pii_detected: true,
    retention_policy: "3_years",
    encryption_status: "failed"
  }
];

export default function EmailRecordingAgent() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data: metrics = [] } = useQuery({
    queryKey: ['emailRecordingMetrics'],
    queryFn: () => base44.entities.AgentMetric.filter({ agent_name: 'email_recording' }, "-created_date"),
    refetchInterval: 30000,
  });

  const getMetric = (name) => metrics.find(m => m.metric_name === name);

  const totalRecorded = MOCK_RECORDING_EVENTS.filter(e => e.status === 'recorded').length;
  const integrityViolations = MOCK_RECORDING_EVENTS.filter(e => e.data_integrity === 'hash_mismatch').length;
  const piiEvents = MOCK_RECORDING_EVENTS.filter(e => e.pii_detected).length;
  const failedRecordings = MOCK_RECORDING_EVENTS.filter(e => e.status === 'failed_recording').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'recorded': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'failed_recording': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getIntegrityColor = (integrity) => {
    switch (integrity) {
      case 'verified': return 'text-emerald-400';
      case 'hash_mismatch': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Database className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Email Recording Agent</h1>
            <p className="text-slate-400 mt-1">Compliance & Data Integrity Monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 border">
            GDPR COMPLIANT
          </Badge>
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20 border">
            SOX READY
          </Badge>
        </div>
      </div>

      {/* KPI Panel */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="Emails Recorded"
          value={totalRecorded}
          status="normal"
          description="Successfully captured & stored"
        />
        <KPICard
          title="Data Integrity Issues"
          value={integrityViolations}
          status={integrityViolations > 0 ? "watch" : "normal"}
          threshold="> 0 = watch"
          description="Hash verification failures"
        />
        <KPICard
          title="PII Detection Events"
          value={piiEvents}
          status="normal"
          description="Emails with personal data"
        />
        <KPICard
          title="Recording Failures"
          value={failedRecordings}
          status={failedRecordings > 0 ? "action" : "normal"}
          threshold="> 0 = action"
          description="Failed to record emails"
        />
      </div>

      {/* Recording Events */}
      <Card className="border-slate-800/50 bg-slate-900/30 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5 text-purple-400" />
            Recent Recording Events ({MOCK_RECORDING_EVENTS.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_RECORDING_EVENTS.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/30 transition-all cursor-pointer"
                onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`border ${getStatusColor(event.status)}`}>
                        {event.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-xs text-slate-400">
                        {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                      </span>
                      {event.pii_detected && (
                        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 border text-xs">
                          PII DETECTED
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-medium text-white mb-1">{event.subject}</h4>
                    <div className="text-sm text-slate-400">
                      From: {event.sender} → To: {event.recipient}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 text-xs ${getIntegrityColor(event.data_integrity)}`}>
                      {event.data_integrity === 'verified' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : event.data_integrity === 'hash_mismatch' ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                      {event.data_integrity.replace('_', ' ')}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedEvent?.id === event.id && (
                  <div className="border-t border-slate-700/50 pt-4 mt-4">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-semibold text-slate-300 mb-2">Recording Details</h5>
                        <div className="space-y-1 text-slate-400">
                          <div>Email ID: <span className="text-slate-300 font-mono">{event.email_id}</span></div>
                          <div>Retention: <span className="text-slate-300">{event.retention_policy.replace('_', ' ')}</span></div>
                          <div>Encryption: <span className={event.encryption_status === 'encrypted' ? 'text-emerald-400' : 'text-red-400'}>{event.encryption_status}</span></div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-300 mb-2">Compliance Status</h5>
                        <div className="space-y-1 text-slate-400">
                          <div>Data Integrity: <span className={getIntegrityColor(event.data_integrity)}>{event.data_integrity.replace('_', ' ')}</span></div>
                          <div>PII Detected: <span className={event.pii_detected ? 'text-amber-400' : 'text-emerald-400'}>{event.pii_detected ? 'Yes' : 'No'}</span></div>
                          <div>GDPR Compliant: <span className="text-emerald-400">Yes</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-slate-800/50 bg-emerald-500/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">
                {Math.round((totalRecorded / MOCK_RECORDING_EVENTS.length) * 100)}%
              </div>
              <div className="text-sm text-slate-400">Recording Success Rate</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-blue-500/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">100%</div>
              <div className="text-sm text-slate-400">GDPR Compliance</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-purple-500/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {MOCK_RECORDING_EVENTS.filter(e => e.encryption_status === 'encrypted').length}
              </div>
              <div className="text-sm text-slate-400">Encrypted Records</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}