import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function OTAssetGrid({ assets }) {
  const getStatusConfig = (status) => {
    const configs = {
      online: { 
        color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: Wifi
      },
      offline: { 
        color: "bg-slate-500/10 text-slate-400 border-slate-500/20",
        icon: WifiOff
      },
      anomaly_detected: { 
        color: "bg-red-500/10 text-red-400 border-red-500/20",
        icon: AlertTriangle
      },
      baseline_learning: { 
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        icon: Wifi
      }
    };
    return configs[status] || configs.online;
  };

  const getRoleColor = (role) => {
    const colors = {
      hmi: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      plc: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      rtu: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      historian: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      engineering_station: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      scada_server: "bg-pink-500/10 text-pink-400 border-pink-500/20"
    };
    return colors[role] || colors.plc;
  };

  return (
    <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Server className="w-5 h-5 text-blue-500" />
          OT Asset Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {assets.length === 0 ? (
            <div className="col-span-full text-center py-8 text-slate-400">
              <Server className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No OT assets monitored</p>
            </div>
          ) : (
            assets.map((asset) => {
              const statusConfig = getStatusConfig(asset.status);
              const StatusIcon = statusConfig.icon;
              return (
                <div
                  key={asset.id}
                  className="p-4 rounded-lg border border-slate-700/50 bg-slate-900/30 hover:border-slate-600/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-slate-400" />
                      <h4 className="font-semibold text-white">{asset.asset_name}</h4>
                    </div>
                    <StatusIcon className={`w-4 h-4 ${statusConfig.color.split(' ')[1]}`} />
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="text-xs text-slate-400">
                      <span className="text-slate-500">IP:</span> {asset.ip_address}
                    </div>
                    <div className="text-xs text-slate-400">
                      <span className="text-slate-500">Zone:</span> {asset.zone || 'N/A'}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className={`${getRoleColor(asset.role)} border text-xs`}>
                      {asset.role.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-slate-400 border-slate-600 text-xs">
                      {asset.protocol.toUpperCase()}
                    </Badge>
                  </div>

                  <Badge className={`${statusConfig.color} border w-full justify-center`}>
                    {asset.status.replace(/_/g, ' ')}
                  </Badge>

                  {asset.last_seen && (
                    <div className="text-xs text-slate-500 mt-2">
                      Last seen {formatDistanceToNow(new Date(asset.last_seen), { addSuffix: true })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}