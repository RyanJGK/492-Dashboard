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
  const [selectedAsset, setSelectedAsset] = React.useState(null);

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
  
  const assetsOnline = assets.filter(a => a.status === 'online').length;
  const assetsAnomaly = assets.filter(a => a.status === 'anomaly_detected').length;
  const assetsBaseline = assets.filter(a => a.baseline_established).length;
  const assetCoverage = getMetric('asset_coverage')?.metric_value || 0;
  const baselineDeviations = getMetric('baseline_deviations')?.metric_value || 0;
  const unauthorizedFlows = getMetric('unauthorized_flows')?.metric_value || 0;

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

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
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
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 border text-xs">
            READ-ONLY COLLECTION
          </Badge>
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 border text-xs">
            SAFETY-FIRST
          </Badge>
        </div>
      </div>

      {/* 1️⃣ TOP LAYER - Primary KPIs (3 key metrics) */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className={`${assetCoverage >= 90 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'} border`}>
          <CardContent className="pt-6 pb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Server className={`w-5 h-5 ${assetCoverage >= 90 ? 'text-emerald-400' : 'text-amber-400'}`} />
                <h3 className="text-sm font-medium text-slate-400">ASSET COVERAGE</h3>
              </div>
              <div className={`text-6xl font-bold ${assetCoverage >= 90 ? 'text-emerald-400' : 'text-amber-400'} mb-2`}>
                {assetCoverage.toFixed(1)}%
              </div>
              <p className="text-sm text-slate-500">{assetsOnline} of {assets.length} online</p>
            </div>
          </CardContent>
        </Card>

        <Card className={`${baselineDeviations === 0 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'} border`}>
          <CardContent className="pt-6 pb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <AlertTriangle className={`w-5 h-5 ${baselineDeviations === 0 ? 'text-emerald-400' : 'text-amber-400'}`} />
                <h3 className="text-sm font-medium text-slate-400">BASELINE DEVIATIONS</h3>
              </div>
              <div className={`text-6xl font-bold ${baselineDeviations === 0 ? 'text-emerald-400' : 'text-amber-400'} mb-2`}>
                {baselineDeviations}
              </div>
              <p className="text-sm text-slate-500">Protocol anomalies detected</p>
            </div>
          </CardContent>
        </Card>

        <Card className={`${unauthorizedFlows === 0 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'} border`}>
          <CardContent className="pt-6 pb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Wifi className={`w-5 h-5 ${unauthorizedFlows === 0 ? 'text-emerald-400' : 'text-red-400'}`} />
                <h3 className="text-sm font-medium text-slate-400">UNAUTHORIZED FLOWS</h3>
              </div>
              <div className={`text-6xl font-bold ${unauthorizedFlows === 0 ? 'text-emerald-400' : 'text-red-400'} mb-2`}>
                {unauthorizedFlows}
              </div>
              <p className="text-sm text-slate-500">Not in allowlist</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2️⃣ MIDDLE LAYER - Asset Grid with Click Details */}
      <Card className="border-slate-800/50 bg-slate-900/30 mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                <Server className="w-5 h-5 text-cyan-400" />
                OT Asset Inventory
              </CardTitle>
              <p className="text-sm text-slate-400 mt-1">{assets.length} total assets · {assetsBaseline} with baseline</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400">Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-xs text-slate-400">Anomaly</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {assets.map((asset) => (
              <div 
                key={asset.id} 
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedAsset?.id === asset.id 
                    ? 'border-blue-500/50 bg-blue-500/10' 
                    : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50 hover:bg-slate-800/50'
                }`}
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-white text-sm">{asset.asset_name}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    asset.status === 'online' ? 'bg-emerald-500' :
                    asset.status === 'anomaly_detected' ? 'bg-red-500 animate-pulse' :
                    'bg-slate-500'
                  }`} />
                </div>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>IP: <span className="text-slate-300 font-mono">{asset.ip_address}</span></div>
                  <div>Role: <span className="text-slate-300">{asset.role.toUpperCase()}</span></div>
                  <div>Protocol: <span className="text-slate-300">{asset.protocol.toUpperCase()}</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* Asset Details Panel */}
          {selectedAsset && (
            <div className="mt-6 p-4 rounded-lg border border-blue-500/30 bg-blue-500/5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-400" />
                  Asset Details: {selectedAsset.asset_name}
                </h4>
                <button 
                  onClick={() => setSelectedAsset(null)}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  ✕ Close
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">IP Address</span>
                  <p className="text-white font-mono mt-1">{selectedAsset.ip_address}</p>
                </div>
                <div>
                  <span className="text-slate-500">MAC Address</span>
                  <p className="text-white font-mono mt-1">{selectedAsset.mac_address}</p>
                </div>
                <div>
                  <span className="text-slate-500">Protocol</span>
                  <p className="text-white mt-1">{selectedAsset.protocol.toUpperCase()}</p>
                </div>
                <div>
                  <span className="text-slate-500">Role</span>
                  <p className="text-white mt-1">{selectedAsset.role.toUpperCase()}</p>
                </div>
                <div>
                  <span className="text-slate-500">Zone</span>
                  <p className="text-white mt-1">{selectedAsset.zone || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-slate-500">Status</span>
                  <p className={`mt-1 font-medium ${
                    selectedAsset.status === 'online' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {selectedAsset.status.replace(/_/g, ' ').toUpperCase()}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Firmware Version</span>
                  <p className="text-white mt-1">{selectedAsset.firmware_version}</p>
                </div>
                <div>
                  <span className="text-slate-500">Vendor</span>
                  <p className="text-white mt-1">{selectedAsset.vendor}</p>
                </div>
                <div>
                  <span className="text-slate-500">Baseline Established</span>
                  <p className={`mt-1 font-medium ${selectedAsset.baseline_established ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {selectedAsset.baseline_established ? 'YES' : 'NO'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 3️⃣ BOTTOM LAYER - Protocol Events Table */}
      <EventTable
        title="Recent Protocol Events"
        events={protocolEvents}
        icon={Activity}
        columns={columns}
      />
    </div>
  );
}