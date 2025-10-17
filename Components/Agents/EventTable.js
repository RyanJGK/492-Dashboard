import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";

export default function EventTable({ title, events, columns, icon: Icon }) {
  const getStatusBadge = (status) => {
    const configs = {
      normal: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      watch: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      action: "bg-red-500/10 text-red-400 border-red-500/20"
    };
    return configs[status] || configs.normal;
  };

  return (
    <Card className="border-slate-800/50 bg-slate-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          {Icon && <Icon className="w-5 h-5 text-blue-400" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No events to display
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800">
                  {columns.map((col) => (
                    <TableHead key={col.key} className="text-slate-400">
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event, idx) => (
                  <TableRow key={event.id || idx} className="border-slate-800 hover:bg-slate-800/30">
                    {columns.map((col) => (
                      <TableCell key={col.key} className="text-slate-300">
                        {col.render ? col.render(event) : event[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}