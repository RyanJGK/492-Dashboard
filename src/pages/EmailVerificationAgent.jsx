import React, { useState } from "react";
import { Shield, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, MessageSquare, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

export default function EmailVerificationAgent() {
  const [expandedTickets, setExpandedTickets] = useState({});
  const [feedbackState, setFeedbackState] = useState({});
  const [comments, setComments] = useState({});

  const { data: flaggedTickets = [] } = useQuery({
    queryKey: ['verificationEvents'],
    queryFn: () => base44.entities.VerificationEvent.list("-timestamp"),
    refetchInterval: 30000,
  });

  const toggleTicket = (ticketId) => {
    setExpandedTickets(prev => ({
      ...prev,
      [ticketId]: !prev[ticketId]
    }));
  };

  const handleFeedback = (ticketId, verdict) => {
    setFeedbackState(prev => ({
      ...prev,
      [ticketId]: verdict
    }));
  };

  const totalFlagged = flaggedTickets.length;
  const confirmedByHuman = Math.floor(totalFlagged * 0.89);
  
  // Determine color based on count
  const getStatusConfig = () => {
    if (totalFlagged > 100) return {
      bg: "bg-red-500/5",
      border: "border-red-500/20",
      text: "text-red-400",
      indicator: "bg-red-500",
      label: "HIGH",
      labelBg: "bg-red-500/10 text-red-400 border-red-500/20"
    };
    if (totalFlagged > 50) return {
      bg: "bg-amber-500/5",
      border: "border-amber-500/20",
      text: "text-amber-400",
      indicator: "bg-amber-500",
      label: "MODERATE",
      labelBg: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    };
    return {
      bg: "bg-emerald-500/5",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      indicator: "bg-emerald-500",
      label: "LOW",
      labelBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    };
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Email Verification Agent</h1>
            <p className="text-slate-400 mt-1">AI-Powered Abuse Detection with Explainability</p>
          </div>
        </div>
      </div>

      {/* 1️⃣ HERO METRIC - Single Primary Card */}
      <Card className={`${statusConfig.bg} border-2 ${statusConfig.border} mb-8`}>
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${statusConfig.indicator} animate-pulse`} />
              <h2 className="text-lg font-medium text-slate-300">Flagged Tickets (24h)</h2>
            </div>
            
            <div className={`text-7xl font-bold ${statusConfig.text} mb-4`}>
              {totalFlagged}
            </div>

            <Badge className={`${statusConfig.labelBg} border text-lg px-4 py-1 mb-4`}>
              {statusConfig.label}
            </Badge>

            <p className="text-sm text-slate-400 mt-4">
              {confirmedByHuman} confirmed by human review ({Math.round((confirmedByHuman/totalFlagged) * 100)}%)
              <span className="text-slate-500 ml-2">— placeholder until backend added</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2️⃣ BACKTRACE STACK - AI Reasoning Timeline */}
      <Card className="border-slate-800/50 bg-slate-900/30 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            AI Decision Trace
          </CardTitle>
          <p className="text-sm text-slate-400 mt-2">
            Explainable reasoning chains for each flagged event
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {flaggedTickets.map((ticket) => {
            const isExpanded = expandedTickets[ticket.id];
            const feedback = feedbackState[ticket.id];

            return (
              <div
                key={ticket.id}
                className={`border rounded-lg transition-all ${
                  feedback === 'confirm' ? 'border-emerald-500/30 bg-emerald-500/5' :
                  feedback === 'incorrect' ? 'border-red-500/30 bg-red-500/5' :
                  'border-slate-700/50 bg-slate-800/30'
                }`}
              >
                {/* Ticket Header */}
                <div
                  className="p-4 cursor-pointer hover:bg-slate-700/20 transition-colors"
                  onClick={() => toggleTicket(ticket.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                          #{ticket.id}
                        </Badge>
                        <Badge className="bg-slate-700 text-slate-300">
                          Confidence: {(ticket.confidence * 100).toFixed(0)}%
                        </Badge>
                        {feedback && (
                          <Badge className={
                            feedback === 'confirm' 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 border'
                              : 'bg-red-500/10 text-red-400 border-red-500/20 border'
                          }>
                            {feedback === 'confirm' ? '✓ Confirmed' : '⚠ Disputed'}
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-medium text-white mb-1">{ticket.description}</h4>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>Email: <span className="text-slate-300 font-mono">{ticket.email}</span></div>
                        <div>IP: <span className="text-slate-300 font-mono">{ticket.ip}</span></div>
                        <div>Time: {formatDistanceToNow(ticket.timestamp, { addSuffix: true })}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-slate-200"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>

                {/* Expanded Reasoning Chain */}
                {isExpanded && (
                  <div className="border-t border-slate-700/50 p-4 bg-slate-900/50">
                    {/* Additional Details */}
                    <div className="mb-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                      <h5 className="text-sm font-semibold text-slate-300 mb-2">Event Details</h5>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500">User Agent:</span>
                          <p className="text-slate-300 font-mono text-[10px] mt-0.5">{ticket.user_agent}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Geo Location:</span>
                          <p className="text-slate-300 mt-0.5">{ticket.geo_location}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Device Fingerprint:</span>
                          <p className="text-slate-300 font-mono mt-0.5">{ticket.device_fingerprint}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Verification Attempts:</span>
                          <p className="text-slate-300 mt-0.5">{ticket.verification_attempts}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Token Age:</span>
                          <p className="text-slate-300 mt-0.5">{ticket.token_age_minutes} minutes</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Domain Age:</span>
                          <p className="text-slate-300 mt-0.5">{ticket.domain_age_days} days</p>
                        </div>
                      </div>
                    </div>

                    <h5 className="text-sm font-semibold text-slate-300 mb-3">AI Reasoning Chain:</h5>
                    <div className="space-y-3 mb-4">
                      {ticket.reasoning.map((step) => (
                        <div key={step.step} className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <span className="text-xs text-blue-400 font-mono">{step.step}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-300 font-mono">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-3 pt-2 border-t border-slate-700/30">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                          <span className="text-xs text-purple-400 font-bold">✓</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-purple-400 font-semibold">
                            Verdict: {(ticket.confidence * 100).toFixed(0)}% confidence flagged as suspicious
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Human Feedback Inline */}
                    <div className="border-t border-slate-700/50 pt-4 mt-4">
                      <h5 className="text-sm font-semibold text-slate-300 mb-3">Human Evaluation:</h5>
                      <div className="flex gap-3 mb-3">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFeedback(ticket.id, 'confirm');
                          }}
                          className={`flex-1 ${
                            feedback === 'confirm'
                              ? 'bg-emerald-500 hover:bg-emerald-600'
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirm AI Verdict
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFeedback(ticket.id, 'incorrect');
                          }}
                          className={`flex-1 ${
                            feedback === 'incorrect'
                              ? 'bg-red-500 hover:bg-red-600'
                              : 'bg-red-500/10 hover:bg-red-500/20 text-red-400'
                          }`}
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Mark as Incorrect
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Add optional notes for AI training..."
                        value={comments[ticket.id] || ''}
                        onChange={(e) => setComments(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                        className="bg-slate-800/50 border-slate-700 text-slate-300 placeholder:text-slate-500"
                        rows={2}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Button variant="outline" className="w-full mt-4 text-slate-400 border-slate-700 hover:bg-slate-800/50">
            Load More Events...
          </Button>
        </CardContent>
      </Card>

      {/* 3️⃣ HUMAN FEEDBACK SUMMARY PANEL */}
      <Card className="border-slate-800/50 bg-slate-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            Human Feedback Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-3xl font-bold text-emerald-400 mb-1">89%</div>
              <div className="text-sm text-slate-400">Human Agreement Rate</div>
              <div className="text-xs text-slate-500 mt-1">(placeholder)</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {Object.values(feedbackState).filter(f => f === 'confirm').length}
              </div>
              <div className="text-sm text-slate-400">Confirmed This Session</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-3xl font-bold text-amber-400 mb-1">
                {Object.values(feedbackState).filter(f => f === 'incorrect').length}
              </div>
              <div className="text-sm text-slate-400">Disputed This Session</div>
            </div>
          </div>

          <div className="text-center">
            <Button variant="outline" className="text-slate-400 border-slate-700 hover:bg-slate-800/50">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Detailed Metrics (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}