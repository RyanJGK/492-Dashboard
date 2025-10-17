import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";

export default function EventTable({ title, events, icon: Icon, columns }) {
  return (
    <Card className="border-slate-800/50 bg-slate-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Icon className="w-5 h-5 text-cyan-400" />
          {title} ({events.length} events)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                {columns.map((column) => (
                  <th key={column.key} className="text-left p-3 text-slate-400 font-medium">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event.id || index} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  {columns.map((column) => (
                    <td key={column.key} className="p-3 text-slate-300">
                      {column.render ? column.render(event) : event[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {events.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            No events to display
          </div>
        )}
      </CardContent>
    </Card>
  );
}