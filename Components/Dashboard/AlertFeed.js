import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Activity, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function AlertFeed({ events }) {
  const getSeverityColor = (severity) => {
    const colors = {
      critical: "bg-red-500/10 text-red-400 border-red-500/20",
      high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      low: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    };
    return colors[severity] || colors.medium;
  };

  const getSourceIcon = (source) => {
    const icons = {
      email_verification_agent: Shield,
      email_recording_agent: Activity,
      ot_tracking_agent: AlertTriangle
    };
    return icons[source] || Activity;
  };

  const getStatusColor = (status) => {
    const colors = {
      open: "border-red-500/30 bg-red-500/5",
      investigating: "border-yellow-500/30 bg-yellow-500/5",
      resolved: "border-emerald-500/30 bg-emerald-500/5",
      false_positive: "border-slate-500/30 bg-slate-500/5"
    };
    return colors[status] || colors.open;
  };

  return (
    <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Security Events Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        {events.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No recent security events</p>
          </div>
        ) : (
          events.map((event) => {
            const SourceIcon = getSourceIcon(event.source);
            return (
              <div
                key={event.id}
                className={`p-4 rounded-lg border transition-all hover:border-slate-600/50 ${getStatusColor(event.status)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <SourceIcon className="w-4 h-4 text-slate-400" />
                    <Badge className={`${getSeverityColor(event.severity)} border`}>
                      {event.severity}
                    </Badge>
                    <Badge variant="outline" className="text-slate-400 border-slate-600">
                      {event.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(event.created_date), { addSuffix: true })}
                  </div>
                </div>
                <h4 className="font-medium text-white mb-1">{event.event_type.replace(/_/g, ' ').toUpperCase()}</h4>
                <p className="text-sm text-slate-300 mb-2">{event.description}</p>
                {event.details && (
                  <div className="text-xs text-slate-400 space-y-1">
                    {event.details.ip && <div>IP: {event.details.ip}</div>}
                    {event.details.asset && <div>Asset: {event.details.asset}</div>}
                    {event.details.protocol && <div>Protocol: {event.details.protocol}</div>}
                  </div>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}