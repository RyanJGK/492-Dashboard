import React from 'react';
import { X, Shield, Clock, User, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { formatDistanceToNow } from '../lib/utils';

export default function TicketDetailModal({ ticket, onClose }) {
  if (!ticket) return null;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'investigating': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'resolved': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Security Event Details</h2>
              <p className="text-sm text-slate-400">Event ID: {ticket.id}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Severity */}
          <div className="flex items-center gap-4">
            <Badge className={`border ${getSeverityColor(ticket.severity)}`}>
              {ticket.severity?.toUpperCase() || 'UNKNOWN'}
            </Badge>
            <Badge className={`border ${getStatusColor(ticket.status)}`}>
              {ticket.status?.toUpperCase() || 'OPEN'}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              {formatDistanceToNow(new Date(ticket.created_date || ticket.timestamp), { addSuffix: true })}
            </div>
          </div>

          {/* Event Description */}
          <Card className="border-slate-700 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white text-lg">Event Description</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-white mb-2">
                {(ticket.event_type || ticket.description)?.replace(/_/g, ' ').toUpperCase()}
              </h3>
              <p className="text-slate-300">
                {ticket.description || 'No description available'}
              </p>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card className="border-slate-700 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white text-lg">Technical Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-slate-300 mb-3">Event Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Source Agent:</span>
                      <span className="text-slate-300 font-mono">
                        {(ticket.source || 'unknown').replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Event Type:</span>
                      <span className="text-slate-300 font-mono">
                        {ticket.event_type || ticket.description || 'unknown'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timestamp:</span>
                      <span className="text-slate-300 font-mono">
                        {new Date(ticket.created_date || ticket.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-300 mb-3">Additional Context</h4>
                  <div className="space-y-2 text-sm">
                    {ticket.details?.ip && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">IP Address:</span>
                        <span className="text-slate-300 font-mono">{ticket.details.ip}</span>
                      </div>
                    )}
                    {ticket.ip && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">IP Address:</span>
                        <span className="text-slate-300 font-mono">{ticket.ip}</span>
                      </div>
                    )}
                    {ticket.email && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Email:</span>
                        <span className="text-slate-300 font-mono">{ticket.email}</span>
                      </div>
                    )}
                    {ticket.details?.asset && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Asset:</span>
                        <span className="text-slate-300 font-mono">{ticket.details.asset}</span>
                      </div>
                    )}
                    {ticket.details?.protocol && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Protocol:</span>
                        <span className="text-slate-300 font-mono">{ticket.details.protocol}</span>
                      </div>
                    )}
                    {ticket.confidence && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Confidence:</span>
                        <span className="text-slate-300 font-mono">{Math.round(ticket.confidence * 100)}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Reasoning (if available) */}
          {ticket.reasoning && (
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white text-lg">AI Analysis Chain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ticket.reasoning.map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <span className="text-xs text-blue-400 font-mono">{step.step}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-300 font-mono">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Resolved
            </Button>
            <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Escalate to Security Team
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              Add to Investigation Queue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}