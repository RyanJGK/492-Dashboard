import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Database, ShieldCheck, AlertTriangle } from "lucide-react";
import KPICard from "../Components/Agents/KPICard";
import EventTable from "../Components/Agents/EventTable";
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

  const dataCompleteness = getMetric('data_completeness')?.metric_value || 0;
  const piiCompliance = getMetric('pii_compliance')?.metric_value || 0;
  const integrityViolations = getMetric('integrity_violations')?.metric_value || 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
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

      {/* 1️⃣ TOP LAYER - Primary KPIs (3 key metrics) */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className={`${dataCompleteness >= 99 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'} border`}>
          <CardContent className="pt-6 pb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${dataCompleteness >= 99 ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                <h3 className="text-sm font-medium text-slate-400">DATA COMPLETENESS</h3>
              </div>
              <div className={`text-6xl font-bold ${dataCompleteness >= 99 ? 'text-emerald-400' : 'text-amber-400'} mb-2`}>
                {dataCompleteness.toFixed(1)}%
              </div>
              <p className="text-sm text-slate-500">Required fields populated</p>
            </div>
          </CardContent>
        </Card>

        <Card className={`${piiCompliance === 100 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'} border`}>
          <CardContent className="pt-6 pb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <ShieldCheck className={`w-5 h-5 ${piiCompliance === 100 ? 'text-emerald-400' : 'text-red-400'}`} />
                <h3 className="text-sm font-medium text-slate-400">PII COMPLIANCE</h3>
              </div>
              <div className={`text-6xl font-bold ${piiCompliance === 100 ? 'text-emerald-400' : 'text-red-400'} mb-2`}>
                {piiCompliance}%
              </div>
              <p className="text-sm text-slate-500">Zero schema violations</p>
            </div>
          </CardContent>
        </Card>

        <Card className={`${integrityViolations === 0 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'} border`}>
          <CardContent className="pt-6 pb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <AlertTriangle className={`w-5 h-5 ${integrityViolations === 0 ? 'text-emerald-400' : 'text-red-400'}`} />
                <h3 className="text-sm font-medium text-slate-400">INTEGRITY VIOLATIONS</h3>
              </div>
              <div className={`text-6xl font-bold ${integrityViolations === 0 ? 'text-emerald-400' : 'text-red-400'} mb-2`}>
                {integrityViolations}
              </div>
              <p className="text-sm text-slate-500">Schema/referential issues</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2️⃣ MIDDLE LAYER - Compliance Status Cards */}
      <Card className="border-slate-800/50 bg-slate-900/30 mb-8">
        <CardHeader>
          <CardTitle className="text-white text-lg">Compliance Controls</CardTitle>
          <p className="text-sm text-slate-400 mt-1">Active data governance and privacy policies</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-white font-semibold text-sm">Schema Linting</h3>
              </div>
              <p className="text-emerald-400 text-2xl font-bold mb-1">ACTIVE</p>
              <p className="text-slate-400 text-xs">CI pipeline blocks disallowed PII columns</p>
            </div>

            <div className="p-5 rounded-lg border border-blue-500/20 bg-blue-500/5">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-5 h-5 text-blue-400" />
                <h3 className="text-white font-semibold text-sm">Retention Policy</h3>
              </div>
              <p className="text-blue-400 text-2xl font-bold mb-1">365 DAYS</p>
              <p className="text-slate-400 text-xs">Automated purge beyond retention window</p>
            </div>

            <div className="p-5 rounded-lg border border-purple-500/20 bg-purple-500/5">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-purple-400" />
                <h3 className="text-white font-semibold text-sm">Access Control</h3>
              </div>
              <p className="text-purple-400 text-2xl font-bold mb-1">ROW-LEVEL</p>
              <p className="text-slate-400 text-xs">Role-based policies enforced</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3️⃣ BOTTOM LAYER - Data Quality Checks Table */}
      <EventTable
        title="Recent Data Quality Checks"
        events={qualityChecks}
        icon={AlertTriangle}
        columns={columns}
      />
    </div>
  );
}