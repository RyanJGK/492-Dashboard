import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Activity, Server, AlertTriangle, Wifi } from "lucide-react";
import KPICard from "../components/Agents/KPICard";
import EventTable from "../components/Agents/EventTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export default function OTTrackingAgent() {
  const { data: metrics = [] } = useQuery({
    queryKey: ['otTrackingMetrics'],
    queryFn: () => base44.entities.AgentMetric.filter({ agent_name: 'ot_tracking' }, "-created_date"),
    refetchInterval: 30000,
  });

  const { data: assets = [] } = useQuery({
    queryKey: ['otAssets'],
    queryFn: () => base44.entities.OTAsset.list("-last_seen"),
  });

  const { data: protocolEvents = [] } = useQuery({
    queryKey: ['protocolEvents'],
    queryFn: () => base44.entities.OTProtocolEvent.list("-created_date", 50),
  });

  const getMetric = (name) => metrics.find(m => m.metric_name === name);

  const columns = [
    { 
      key: 'created_date', 
      label: 'Time',
      render: (e) => formatDistanceToNow(new Date(e.created_date), { addSuffix: true })
    },
    { key: 'protocol', label: 'Protocol', render: (e) => e.protocol.toUpperCase() },
    { key: 'source_asset', label: 'Source' },
    { key: 'dest_asset', label: 'Destination' },
    { key: 'function_code', label: 'Function' },
    { 
      key: 'is_baseline_deviation', 
      label: 'Status',
      render: (e) => (
        e.is_baseline_deviation ? (
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 border">
            DEVIATION
          </Badge>
        ) : e.is_unauthorized ? (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20 border">
            UNAUTHORIZED
          </Badge>
        ) : (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 border">
            NORMAL
          </Badge>
        )
      )
    },
  ];

  const assetsOnline = assets.filter(a => a.status === 'online').length;
  const assetsAnomaly = assets.filter(a => a.status === 'anomaly_detected').length;

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Activity className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">SCADA/OT Tracking Agent</h1>
            <p className="text-slate-400 mt-1">Passive Monitoring & Baseline Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 border">
            READ-ONLY COLLECTION
          </Badge>
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 border">
            SAFETY-FIRST
          </Badge>
        </div>
      </div>

      {/* KPI Panel */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <KPICard
          title="Asset Coverage"
          value={getMetric('asset_coverage')?.metric_value || 0}
          unit="%"
          status={getMetric('asset_coverage')?.status || 'normal'}
          threshold="≥ 90% = normal"
          description="Assets observed vs. inventory"
        />
        <KPICard
          title="Baseline Deviations"
          value={getMetric('baseline_deviations')?.metric_value || 0}
          status={getMetric('baseline_deviations')?.status || 'normal'}
          threshold="> 0 = watch"
          description="Protocol/timing anomalies"
        />
        <KPICard
          title="Unauthorized Flows"
          value={getMetric('unauthorized_flows')?.metric_value || 0}
          status={getMetric('unauthorized_flows')?.status || 'normal'}
          threshold="> 0 = action"
          description="Flows not in allowlist"
        />
        <KPICard
          title="False Positive Rate"
          value={getMetric('false_positive_rate')?.metric_value || 0}
          unit="%"
          status={getMetric('false_positive_rate')?.status || 'normal'}
          threshold="< 2% = normal"
          description="On OT anomaly alerts"
        />
        <KPICard
          title="Zone Violations"
          value={getMetric('zone_violations')?.metric_value || 0}
          status={getMetric('zone_violations')?.status || 'normal'}
          threshold="> 0 = action"
          description="Cross-zone unauthorized traffic"
        />
      </div>

      {/* Asset Status Grid */}
      <Card className="border-slate-800/50 bg-slate-900/30 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Server className="w-5 h-5 text-cyan-400" />
            OT Asset Status ({assets.length} total)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-slate-400">Online</span>
              </div>
              <div className="text-3xl font-bold text-emerald-400">{assetsOnline}</div>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-slate-400">Anomaly</span>
              </div>
              <div className="text-3xl font-bold text-red-400">{assetsAnomaly}</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-500/5 border border-slate-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-400">Baseline Learned</span>
              </div>
              <div className="text-3xl font-bold text-slate-400">
                {assets.filter(a => a.baseline_established).length}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-400">Coverage</span>
              </div>
              <div className="text-3xl font-bold text-blue-400">
                {assets.length > 0 ? Math.round((assetsOnline / assets.length) * 100) : 0}%
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {assets.map((asset) => (
              <div key={asset.id} className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-white">{asset.asset_name}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    asset.status === 'online' ? 'bg-emerald-500' :
                    asset.status === 'anomaly_detected' ? 'bg-red-500' :
                    'bg-slate-500'
                  }`} />
                </div>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>IP: {asset.ip_address}</div>
                  <div>Role: {asset.role.toUpperCase()}</div>
                  <div>Protocol: {asset.protocol.toUpperCase()}</div>
                  {asset.zone && <div>Zone: {asset.zone}</div>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Protocol Events */}
      <EventTable
        title="Recent Protocol Events"
        events={protocolEvents}
        icon={Activity}
        columns={columns}
      />
    </div>
  );
}