import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Shield, Database, Activity, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

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
    
    if (hasAction) return { status: 'ACTION', color: 'text-red-400', bg: 'bg-red-500' };
    if (hasWatch) return { status: 'WATCH', color: 'text-amber-400', bg: 'bg-amber-500' };
    return { status: 'NORMAL', color: 'text-emerald-400', bg: 'bg-emerald-500' };
  };

  const agents = [
    { name: 'email_verification', label: 'Email Verification', icon: Shield, link: '/emailverificationagent' },
    { name: 'email_recording', label: 'Email Recording', icon: Database, link: '/emailrecordingagent' },
    { name: 'ot_tracking', label: 'OT Tracking', icon: Activity, link: '/ottrackingagent' },
  ];

  const totalMetrics = metrics.length;
  const normalMetrics = metrics.filter(m => m.status === 'normal').length;
  const watchMetrics = metrics.filter(m => m.status === 'watch').length;
  const actionMetrics = metrics.filter(m => m.status === 'action').length;
  const openEvents = securityEvents.filter(e => e.status === 'open').length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">System Overview</h1>
        <p className="text-slate-400">Cross-agent monitoring and security status</p>
      </div>

      {/* 1️⃣ TOP LAYER - Primary KPIs (3 key metrics) */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-slate-800/50 bg-emerald-500/5">
          <CardContent className="pt-6 pb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-medium text-slate-400">NORMAL METRICS</h3>
              </div>
              <div className="text-6xl font-bold text-emerald-400 mb-2">
                {normalMetrics}
              </div>
              <p className="text-sm text-slate-500">of {totalMetrics} total metrics</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-amber-500/5">
          <CardContent className="pt-6 pb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <h3 className="text-sm font-medium text-slate-400">WATCH STATUS</h3>
              </div>
              <div className="text-6xl font-bold text-amber-400 mb-2">
                {watchMetrics}
              </div>
              <p className="text-sm text-slate-500">metrics under observation</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-red-500/5">
          <CardContent className="pt-6 pb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <h3 className="text-sm font-medium text-slate-400">ACTION REQUIRED</h3>
              </div>
              <div className="text-6xl font-bold text-red-400 mb-2">
                {actionMetrics}
              </div>
              <p className="text-sm text-slate-500">critical items</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2️⃣ MIDDLE LAYER - Agent Status Grid */}
      <Card className="border-slate-800/50 bg-slate-900/30 mb-8">
        <CardHeader>
          <CardTitle className="text-white text-lg">Agent Status</CardTitle>
          <p className="text-sm text-slate-400 mt-1">Real-time monitoring across all agents</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {agents.map((agent) => {
              const Icon = agent.icon;
              const statusInfo = getAgentStatus(agent.name);
              const agentMetrics = metrics.filter(m => m.agent_name === agent.name);
              const criticalCount = agentMetrics.filter(m => m.status === 'action').length;

              return (
                <Link 
                  key={agent.name} 
                  to={agent.link}
                  className="block"
                >
                  <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all cursor-pointer h-full">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-blue-500/10 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{agent.label}</h4>
                          <p className="text-xs text-slate-500">{agentMetrics.length} metrics</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${statusInfo.bg} animate-pulse`} />
                      </div>
                      
                      <div className="flex items-baseline gap-2">
                        <span className={`text-2xl font-bold ${statusInfo.color}`}>
                          {statusInfo.status}
                        </span>
                      </div>
                      
                      {criticalCount > 0 && (
                        <p className="text-xs text-red-400 mt-2">
                          {criticalCount} metric{criticalCount > 1 ? 's' : ''} need attention
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 3️⃣ BOTTOM LAYER - Security Events Feed */}
      <Card className="border-slate-800/50 bg-slate-900/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Recent Security Events
              </CardTitle>
              <p className="text-sm text-slate-400 mt-1">Latest alerts and incidents across all agents</p>
            </div>
            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 border">
              {openEvents} OPEN
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents.slice(0, 6).map((event) => {
              const severityColors = {
                critical: 'bg-red-500/10 text-red-400 border-red-500/20',
                high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
                medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
              };
              
              return (
                <div key={event.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`${severityColors[event.severity]} border text-xs`}>
                        {event.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-slate-400 border-slate-600 text-xs">
                        {event.source.replace(/_agent/g, '').replace(/_/g, ' ')}
                      </Badge>
                      {event.status === 'open' && (
                        <Badge className="bg-red-500/10 text-red-400 border-red-500/20 border text-xs">
                          OPEN
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                      {formatDistanceToNow(new Date(event.created_date), { addSuffix: true })}
                    </span>
                  </div>
                  <h4 className="font-medium text-white mb-1 text-sm">
                    {event.event_type.replace(/_/g, ' ').toUpperCase()}
                  </h4>
                  <p className="text-sm text-slate-400">{event.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}