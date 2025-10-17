import React from 'react';
import { Card } from "../components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

export default function KPICard({ 
  title, 
  value, 
  unit = "",
  status = "normal",
  threshold,
  description,
  trend,
  trendValue
}) {
  const statusConfig = {
    normal: {
      bg: "bg-emerald-500/5",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      indicator: "bg-emerald-500"
    },
    watch: {
      bg: "bg-amber-500/5",
      border: "border-amber-500/20",
      text: "text-amber-400",
      indicator: "bg-amber-500"
    },
    action: {
      bg: "bg-red-500/5",
      border: "border-red-500/20",
      text: "text-red-400",
      indicator: "bg-red-500"
    }
  };

  const config = statusConfig[status];

  return (
    <Card className={`${config.bg} border ${config.border} p-5`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${config.indicator}`} />
            <h3 className="text-sm font-medium text-slate-400">{title}</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${config.text}`}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {unit && <span className={`text-lg ${config.text}`}>{unit}</span>}
          </div>
        </div>
        {status !== "normal" && (
          <AlertTriangle className={`w-5 h-5 ${config.text}`} />
        )}
      </div>
      
      {description && (
        <p className="text-xs text-slate-500 mb-2">{description}</p>
      )}

      <div className="flex items-center justify-between text-xs">
        {threshold && (
          <span className="text-slate-500">
            Threshold: {threshold}
          </span>
        )}
        {trend && trendValue && (
          <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </Card>
  );
}