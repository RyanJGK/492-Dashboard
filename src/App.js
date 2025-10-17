import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './Layout';
import Dashboard from './Pages/Home';
import EmailVerificationAgent from './Pages/EmailVerificationAgent';
import EmailRecordingAgent from './Pages/EmailRecordingAgent';
import OTTrackingAgent from './Pages/OTAgent';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/emailverificationagent" element={<EmailVerificationAgent />} />
            <Route path="/emailrecordingagent" element={<EmailRecordingAgent />} />
            <Route path="/ottrackingagent" element={<OTTrackingAgent />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;