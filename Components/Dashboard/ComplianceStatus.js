import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function ComplianceStatus({ checks }) {
  const getStatusConfig = (status) => {
    const configs = {
      compliant: {
        icon: CheckCircle2,
        color: "text-emerald-400",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      },
      non_compliant: {
        icon: XCircle,
        color: "text-red-400",
        badgeClass: "bg-red-500/10 text-red-400 border-red-500/20"
      },
      needs_review: {
        icon: Clock,
        color: "text-amber-400",
        badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      }
    };
    return configs[status] || configs.needs_review;
  };

  const frameworkStats = React.useMemo(() => {
    const stats = {};
    checks.forEach(check => {
      if (!stats[check.framework]) {
        stats[check.framework] = { compliant: 0, non_compliant: 0, needs_review: 0, total: 0 };
      }
      stats[check.framework][check.status]++;
      stats[check.framework].total++;
    });
    return stats;
  }, [checks]);

  return (
    <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          Compliance Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.keys(frameworkStats).length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <ShieldCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No compliance checks configured</p>
          </div>
        ) : (
          Object.entries(frameworkStats).map(([framework, stats]) => {
            const complianceRate = ((stats.compliant / stats.total) * 100).toFixed(0);
            return (
              <div key={framework} className="p-4 rounded-lg border border-slate-700/50 bg-slate-900/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{framework.replace(/_/g, ' ')}</h4>
                  <div className="text-2xl font-bold text-white">{complianceRate}%</div>
                </div>
                
                <div className="w-full bg-slate-700/30 rounded-full h-2 mb-3">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${complianceRate}%` }}
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 border">
                    {stats.compliant} Compliant
                  </Badge>
                  {stats.non_compliant > 0 && (
                    <Badge className="bg-red-500/10 text-red-400 border-red-500/20 border">
                      {stats.non_compliant} Non-Compliant
                    </Badge>
                  )}
                  {stats.needs_review > 0 && (
                    <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 border">
                      {stats.needs_review} Needs Review
                    </Badge>
                  )}
                </div>
              </div>
            );
          })
        )}

        {checks.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto mt-4">
            <h5 className="text-sm font-medium text-slate-300 mb-2">Recent Checks</h5>
            {checks.slice(0, 5).map((check) => {
              const statusConfig = getStatusConfig(check.status);
              const StatusIcon = statusConfig.icon;
              return (
                <div key={check.id} className="flex items-center justify-between p-2 rounded border border-slate-700/30">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <StatusIcon className={`w-4 h-4 flex-shrink-0 ${statusConfig.color}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-300 truncate">{check.control_name}</p>
                      <p className="text-xs text-slate-500">{check.control_id}</p>
                    </div>
                  </div>
                  <Badge className={`${statusConfig.badgeClass} border ml-2`}>
                    {check.status.replace(/_/g, ' ')}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}