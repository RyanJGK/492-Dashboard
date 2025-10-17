import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Layout";
import Dashboard from "./Pages/Home";
import EmailVerificationAgent from "./Pages/EmailVerificationAgent";
import EmailRecordingAgent from "./Pages/EmailRecordingAgent";
import OTAgent from "./Pages/OTAgent";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/emailverificationagent" element={<Layout><EmailVerificationAgent /></Layout>} />
          <Route path="/emailrecordingagent" element={<Layout><EmailRecordingAgent /></Layout>} />
          <Route path="/ottrackingagent" element={<Layout><OTAgent /></Layout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
