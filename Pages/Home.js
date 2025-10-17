import React, { useState } from "react";
import { base44 } from "../src/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Activity, AlertTriangle, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../src/components/ui/card";
import { Badge } from "../src/components/ui/badge";
import { formatDistanceToNow } from "../src/lib/utils";
import TicketDetailModal from "../src/components/TicketDetailModal";

export default function Dashboard() {
  const [selectedTicket, setSelectedTicket] = useState(null);
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
    
    if (hasAction) return { status: 'action', color: 'text-red-400', bg: 'bg-red-500', label: 'ACTION REQUIRED' };
    if (hasWatch) return { status: 'watch', color: 'text-amber-400', bg: 'bg-amber-500', label: 'MONITORING' };
    return { status: 'normal', color: 'text-emerald-400', bg: 'bg-emerald-500', label: 'OPERATIONAL' };
  };

  const agents = [
    { name: 'email_verification', label: 'Email Verification Agent', icon: Shield },
    { name: 'email_recording', label: 'Email Recording Agent', icon: Activity },
    { name: 'ot_tracking', label: 'OT Tracking Agent', icon: AlertTriangle },
  ];

  // Calculate overall system status
  const criticalEvents = securityEvents.filter(e => e.severity === 'critical').length;
  const highEvents = securityEvents.filter(e => e.severity === 'high').length;
  const totalActiveThreats = criticalEvents + highEvents;
  
  const getSystemStatus = () => {
    if (criticalEvents > 0) return {
      level: 'CRITICAL',
      color: 'text-red-400',
      bg: 'bg-red-500/5',
      border: 'border-red-500/20',
      indicator: 'bg-red-500'
    };
    if (highEvents > 2) return {
      level: 'ELEVATED',
      color: 'text-amber-400', 
      bg: 'bg-amber-500/5',
      border: 'border-amber-500/20',
      indicator: 'bg-amber-500'
    };
    return {
      level: 'SECURE',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/5', 
      border: 'border-emerald-500/20',
      indicator: 'bg-emerald-500'
    };
  };

  const systemStatus = getSystemStatus();

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Cybersecurity Operations Center</h1>
            <p className="text-slate-400 mt-1">OT Manager Dashboard - Real-time Threat Monitoring</p>
          </div>
        </div>
      </div>

      {/* 1️⃣ HERO METRIC - System Security Status */}
      <Card className={`${systemStatus.bg} border-2 ${systemStatus.border} mb-8`}>
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${systemStatus.indicator} animate-pulse`} />
              <h2 className="text-lg font-medium text-slate-300">System Security Status</h2>
            </div>
            
            <div className={`text-7xl font-bold ${systemStatus.color} mb-4`}>
              {systemStatus.level}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{criticalEvents}</div>
                <div className="text-xs text-slate-500">Critical</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">{highEvents}</div>
                <div className="text-xs text-slate-500">High Priority</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-400">{securityEvents.filter(e => e.status === 'open').length}</div>
                <div className="text-xs text-slate-500">Open Events</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2️⃣ AGENT STATUS GRID */}
      <Card className="border-slate-800/50 bg-slate-900/30 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="w-5 h-5 text-blue-400" />
            Agent Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {agents.map((agent) => {
              const Icon = agent.icon;
              const statusInfo = getAgentStatus(agent.name);
              const agentMetrics = metrics.filter(m => m.agent_name === agent.name);
              const criticalMetrics = agentMetrics.filter(m => m.status === 'action').length;

              return (
                <div key={agent.name} className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-white text-sm">{agent.label}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${statusInfo.bg}`} />
                  </div>
                  <div className={`text-lg font-bold ${statusInfo.color} mb-1`}>
                    {statusInfo.label}
                  </div>
                  <div className="text-xs text-slate-500">
                    {agentMetrics.length} metrics tracked
                    {criticalMetrics > 0 && (
                      <span className="text-red-400 ml-2">• {criticalMetrics} action required</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 3️⃣ CRITICAL SECURITY EVENTS */}
      <Card className="border-slate-800/50 bg-slate-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Critical Security Events
          </CardTitle>
          <p className="text-sm text-slate-400 mt-2">
            High-priority threats requiring immediate attention
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents.filter(e => e.severity === 'critical' || e.severity === 'high')
              .slice(0, 6).map((event) => (
              <div 
                key={event.id} 
                className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all cursor-pointer"
                onClick={() => setSelectedTicket(event)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`
                      ${event.severity === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                      ${event.severity === 'high' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                      border text-xs
                    `}>
                      {event.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-blue-400 border-blue-500/30 text-xs">
                      {event.source.replace(/_/g, ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-500">
                    {formatDistanceToNow(new Date(event.created_date), { addSuffix: true })}
                  </span>
                </div>
                <h4 className="text-white font-medium mb-1">
                  {event.event_type.replace(/_/g, ' ').toUpperCase()}
                </h4>
                <p className="text-sm text-slate-400">{event.description}</p>
                {event.details && (
                  <div className="mt-2 text-xs text-slate-500">
                    {event.details.ip && <span>IP: {event.details.ip}</span>}
                    {event.details.asset && <span>Asset: {event.details.asset}</span>}
                    {event.details.count && <span className="ml-3">Count: {event.details.count}</span>}
                  </div>
                )}
              </div>
            ))}
            
            {securityEvents.filter(e => e.severity === 'critical' || e.severity === 'high').length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <Shield className="w-12 h-12 mx-auto mb-3 text-emerald-500" />
                <p>No critical security events detected</p>
                <p className="text-xs mt-1">System operating normally</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <TicketDetailModal 
          ticket={selectedTicket} 
          onClose={() => setSelectedTicket(null)} 
        />
      )}
    </div>
  );
}