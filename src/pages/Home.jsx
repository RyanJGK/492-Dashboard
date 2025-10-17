import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Activity, AlertTriangle, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { data: metrics = [] } = useQuery({
    queryKey: ['agentMetrics'],
    queryFn: () => base44.entities.AgentMetric.list("-created_date"),
    refetchInterval: 30000,
  });

  const { data: securityEvents = [] } = useQuery({
    queryKey: ['securityEvents'],
    queryFn: () => base44.entities.SecurityEvent.list("-created_date", 10),
  });

  const getAgentStatus = (agentName) => {
    const agentMetrics = metrics.filter(m => m.agent_name === agentName);
    const hasAction = agentMetrics.some(m => m.status === 'action');
    const hasWatch = agentMetrics.some(m => m.status === 'watch');
    
    if (hasAction) return { status: 'action', color: 'text-red-400', bg: 'bg-red-500' };
    if (hasWatch) return { status: 'watch', color: 'text-amber-400', bg: 'bg-amber-500' };
    return { status: 'normal', color: 'text-emerald-400', bg: 'bg-emerald-500' };
  };

  const agents = [
    { name: 'email_verification', label: 'Email Verification Agent', icon: Shield },
    { name: 'email_recording', label: 'Email Recording Agent', icon: Activity },
    { name: 'ot_tracking', label: 'OT Tracking Agent', icon: AlertTriangle },
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Agent Monitoring Overview</h1>
        <p className="text-slate-400">Cross-agent correlation and system health</p>
      </div>

      {/* Agent Status Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const statusInfo = getAgentStatus(agent.name);
          const agentMetrics = metrics.filter(m => m.agent_name === agent.name);
          const criticalMetrics = agentMetrics.filter(m => m.status === 'action').length;

          return (
            <Card key={agent.name} className="border-slate-800/50 bg-slate-900/30 hover:border-slate-700/50 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-base">{agent.label}</CardTitle>
                      <p className="text-xs text-slate-500 mt-1">
                        {agentMetrics.length} metrics tracked
                      </p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${statusInfo.bg} animate-pulse`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold ${statusInfo.color}`}>
                      {statusInfo.status.toUpperCase()}
                    </div>
                    {criticalMetrics > 0 && (
                      <p className="text-sm text-red-400 mt-1">
                        {criticalMetrics} metric{criticalMetrics > 1 ? 's' : ''} require action
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* IT ↔ OT Correlation Events */}
      <Card className="border-slate-800/50 bg-slate-900/30 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            IT ↔ OT Correlation Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 text-sm mb-4">
            Events showing potential correlation between IT (email/auth) and OT systems
          </p>
          <div className="space-y-3">
            {securityEvents.filter(e => 
              (e.source === 'email_verification_agent' || e.source === 'email_recording_agent') &&
              e.severity === 'high' || e.severity === 'critical'
            ).slice(0, 5).map((event) => (
              <div key={event.id} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`
                      ${event.severity === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                      ${event.severity === 'high' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                      border
                    `}>
                      {event.severity}
                    </Badge>
                    <span className="text-slate-400 text-xs">{event.source.replace(/_/g, ' ')}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {formatDistanceToNow(new Date(event.created_date), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-white font-medium mb-1">{event.event_type.replace(/_/g, ' ').toUpperCase()}</p>
                <p className="text-sm text-slate-400">{event.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System-Wide Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-slate-800/50 bg-emerald-500/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">
                {metrics.filter(m => m.status === 'normal').length}
              </div>
              <div className="text-sm text-slate-400">Normal Metrics</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-amber-500/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">
                {metrics.filter(m => m.status === 'watch').length}
              </div>
              <div className="text-sm text-slate-400">Watch Status</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-red-500/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-1">
                {metrics.filter(m => m.status === 'action').length}
              </div>
              <div className="text-sm text-slate-400">Action Required</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-blue-500/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {securityEvents.filter(e => e.status === 'open').length}
              </div>
              <div className="text-sm text-slate-400">Open Events</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}