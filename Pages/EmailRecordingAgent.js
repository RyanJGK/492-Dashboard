import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Database, ShieldCheck, AlertTriangle } from "lucide-react";
import KPICard from "../components/agents/KPICard";
import EventTable from "../components/agents/EventTable";
import { formatDistanceToNow } from "date-fns";

export default function EmailRecordingAgent() {
  const { data: metrics = [] } = useQuery({
    queryKey: ['emailRecordingMetrics'],
    queryFn: () => base44.entities.AgentMetric.filter({ agent_name: 'email_recording' }, "-created_date"),
    refetchInterval: 30000,
  });

  const { data: qualityChecks = [] } = useQuery({
    queryKey: ['qualityChecks'],
    queryFn: () => base44.entities.DataQualityCheck.list("-created_date", 50),
  });

  const getMetric = (name) => metrics.find(m => m.metric_name === name);

  const columns = [
    { 
      key: 'created_date', 
      label: 'Time',
      render: (e) => formatDistanceToNow(new Date(e.created_date), { addSuffix: true })
    },
    { key: 'check_type', label: 'Check Type', render: (e) => e.check_type.replace(/_/g, ' ').toUpperCase() },
    { key: 'table_name', label: 'Table' },
    { key: 'records_checked', label: 'Records Checked', render: (e) => e.records_checked.toLocaleString() },
    { 
      key: 'violations_found', 
      label: 'Violations',
      render: (e) => (
        <span className={`font-medium ${e.violations_found > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
          {e.violations_found}
        </span>
      )
    },
    { 
      key: 'severity', 
      label: 'Severity',
      render: (e) => (
        <span className={`font-medium ${
          e.severity === 'critical' ? 'text-red-400' : 
          e.severity === 'high' ? 'text-orange-400' : 
          e.severity === 'medium' ? 'text-amber-400' : 
          'text-blue-400'
        }`}>
          {e.severity.toUpperCase()}
        </span>
      )
    },
    { key: 'remediation_status', label: 'Status', render: (e) => e.remediation_status.replace(/_/g, ' ').toUpperCase() },
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Database className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Email Recording Agent</h1>
            <p className="text-slate-400 mt-1">Data Integrity & Privacy Compliance</p>
          </div>
        </div>
      </div>

      {/* KPI Panel */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <KPICard
          title="Data Completeness"
          value={getMetric('data_completeness')?.metric_value || 0}
          unit="%"
          status={getMetric('data_completeness')?.status || 'normal'}
          threshold="< 99% = watch"
          description="Required fields populated"
        />
        <KPICard
          title="Integrity Violations"
          value={getMetric('integrity_violations')?.metric_value || 0}
          status={getMetric('integrity_violations')?.status || 'normal'}
          threshold="> 0 = action"
          description="Schema/referential violations"
        />
        <KPICard
          title="PII Compliance"
          value={getMetric('pii_compliance')?.metric_value || 0}
          unit="%"
          status={getMetric('pii_compliance')?.status || 'normal'}
          threshold="< 100% = action"
          description="Zero schema violations"
        />
        <KPICard
          title="Retention Violations"
          value={getMetric('retention_violations')?.metric_value || 0}
          status={getMetric('retention_violations')?.status || 'normal'}
          threshold="> 0 = watch"
          description="Records beyond retention window"
        />
        <KPICard
          title="Failed Login Anomalies"
          value={getMetric('failed_login_anomalies')?.metric_value || 0}
          status={getMetric('failed_login_anomalies')?.status || 'normal'}
          threshold="> 5 = watch"
          description="Excessive failed login patterns"
        />
      </div>

      {/* Privacy & Compliance Status */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-white font-semibold">Schema Linting</h3>
          </div>
          <p className="text-emerald-400 text-2xl font-bold mb-1">ACTIVE</p>
          <p className="text-slate-400 text-sm">CI pipeline blocks disallowed PII columns</p>
        </div>

        <div className="p-6 rounded-lg border border-blue-500/20 bg-blue-500/5">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-semibold">Retention Enforcement</h3>
          </div>
          <p className="text-blue-400 text-2xl font-bold mb-1">365 DAYS</p>
          <p className="text-slate-400 text-sm">Automated purge beyond retention window</p>
        </div>

        <div className="p-6 rounded-lg border border-purple-500/20 bg-purple-500/5">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-semibold">Access Control</h3>
          </div>
          <p className="text-purple-400 text-2xl font-bold mb-1">ROW-LEVEL</p>
          <p className="text-slate-400 text-sm">Role-based policies enforced</p>
        </div>
      </div>

      {/* Data Quality Checks */}
      <EventTable
        title="Recent Data Quality Checks"
        events={qualityChecks}
        icon={AlertTriangle}
        columns={columns}
      />
    </div>
  );
}