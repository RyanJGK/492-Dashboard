import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./lib/utils";
import { Shield, Mail, Database, Activity, Home } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: createPageUrl("Dashboard"), icon: Home },
    { name: "Email Verification", path: createPageUrl("EmailVerificationAgent"), icon: Shield },
    { name: "Email Recording", path: createPageUrl("EmailRecordingAgent"), icon: Database },
    { name: "OT Tracking", path: createPageUrl("OTTrackingAgent"), icon: Activity },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Navigation Bar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Energy Defense</h1>
                <p className="text-xs text-slate-400">Agent Monitoring System</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      active
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-slate-400">Live</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto">
        {children}
      </main>
    </div>
  );
}