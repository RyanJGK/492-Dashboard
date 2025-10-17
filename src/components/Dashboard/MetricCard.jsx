import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function MetricCard({ 
  title, 
  value, 
  unit = "", 
  icon: Icon, 
  trend, 
  trendValue,
  status = "normal",
  subtitle 
}) {
  const statusColors = {
    normal: "bg-emerald-500/10 text-emerald-500",
    warning: "bg-amber-500/10 text-amber-500",
    critical: "bg-red-500/10 text-red-500"
  };

  const getTrendIcon = () => {
    if (!trend) return <Minus className="w-3 h-3" />;
    return trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
  };

  const getTrendColor = () => {
    if (!trend) return "text-gray-400";
    return trend === "up" ? "text-emerald-500" : "text-red-500";
  };

  return (
    <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-slate-600/50 transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${statusColors[status]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">
          {value}
          {unit && <span className="text-lg ml-1 text-slate-400">{unit}</span>}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
        )}
        {trendValue && (
          <div className={`flex items-center gap-1 mt-2 text-xs ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}