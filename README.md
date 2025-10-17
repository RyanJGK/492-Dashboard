# Cybersecurity Agent Dashboard

A modern, clean cybersecurity operations dashboard designed for OT (Operational Technology) managers. This dashboard provides real-time monitoring and analysis of security events across email verification, email recording, and OT tracking systems.

## Features

### 🛡️ **Multi-Agent Security Monitoring**
- **Email Verification Agent**: AI-powered abuse detection with explainable reasoning
- **Email Recording Agent**: Compliance & data integrity monitoring (GDPR/SOX ready)
- **OT Tracking Agent**: SCADA/OT passive monitoring with baseline analysis

### 📊 **Clean Dashboard Design**
- **3-Layer Architecture**: Primary KPIs → Core Visualization → Alert Tables
- **Consistent Visual Hierarchy**: Following Agent Verification page baseline
- **Dark Theme**: Professional cybersecurity aesthetic with blue/amber/red highlights

### 🔍 **Detailed Event Analysis**
- **Clickable Security Events**: Detailed modal views for each incident
- **AI Reasoning Chains**: Step-by-step explanation of threat detection logic
- **Human Feedback Integration**: Confirm/dispute AI decisions for continuous learning

### 🏭 **OT-Specific Features**
- **Asset Coverage Monitoring**: Track visibility across industrial systems
- **Protocol Anomaly Detection**: Modbus, DNP3, OPC-UA, IEC protocols
- **Zone Violation Alerts**: Unauthorized cross-zone communications
- **Baseline Deviation Tracking**: Learn normal patterns, detect anomalies

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd cybersecurity-agent-dashboard
npm install
```

2. **Start the development server:**
```bash
npm start
```

3. **Open your browser:**
Navigate to `http://localhost:3000`

## Dashboard Structure

### Main Dashboard (`/dashboard`)
- **System Security Status**: Overall threat level indicator
- **Agent Status Grid**: Real-time status of all monitoring agents  
- **Critical Security Events**: High-priority incidents requiring attention

### Agent-Specific Pages

#### Email Verification Agent (`/emailverificationagent`)
- **Flagged Tickets Metric**: 24-hour detection count with risk assessment
- **AI Decision Trace**: Explainable reasoning for each flagged event
- **Human Feedback Panel**: Training interface for AI improvement

#### Email Recording Agent (`/emailrecordingagent`) 
- **Recording Metrics**: Success rates, integrity violations, PII detection
- **Compliance Status**: GDPR/SOX compliance tracking
- **Event Details**: Expandable views with encryption and retention info

#### OT Tracking Agent (`/ottrackingagent`)
- **Asset Coverage**: Percentage of OT assets under monitoring
- **Protocol Events**: Real-time industrial protocol activity
- **Baseline Deviations**: Anomalies from learned normal behavior

## Mock Data

The dashboard includes realistic cybersecurity scenarios:

- **Token Reuse Attacks**: Credential stuffing detection
- **OT Protocol Anomalies**: Malformed Modbus/DNP3 packets
- **Unauthorized OT Flows**: Cross-zone communication violations  
- **Data Integrity Issues**: Email tampering detection
- **Velocity Attacks**: Burst request patterns
- **Baseline Deviations**: Industrial system behavior changes

## Technology Stack

- **Frontend**: React 18, React Router, TailwindCSS
- **State Management**: TanStack Query for server state
- **Icons**: Lucide React
- **Styling**: Custom design system with consistent dark theme
- **Mock API**: Simulated backend with realistic cybersecurity data

## Design Principles

### Visual Consistency
- **Colors**: Dark slate background with blue/amber/red status indicators
- **Typography**: Consistent font sizes and weights across components
- **Spacing**: Uniform card margins and padding
- **Grid Layout**: Responsive design with consistent alignment

### Information Architecture  
- **Top Level**: Primary KPI metrics (1-3 key numbers maximum)
- **Middle Level**: Core data visualization (charts, heatmaps, timelines)
- **Bottom Level**: Detailed event tables with expandable rows

### Cybersecurity UX
- **Severity-Based Colors**: Red (critical), amber (high), blue (normal)
- **Status Indicators**: Animated pulse dots for live monitoring
- **Contextual Actions**: Relevant buttons based on event type
- **Progressive Disclosure**: Summary → Details → Full Analysis

## File Structure

```
├── src/
│   ├── components/ui/          # Reusable UI components
│   ├── api/base44Client.js     # Mock API with realistic data
│   ├── lib/utils.js           # Utility functions
│   └── App.js                 # Main application component
├── Components/
│   ├── Agents/                # Agent-specific components
│   └── Dashboard/             # Dashboard widgets
├── Pages/                     # Main page components
├── Entities/                  # Data models and schemas
└── Layout.js                  # Navigation and layout
```

## Customization

### Adding New Agents
1. Create new page component in `Pages/`
2. Add route to `src/App.js`
3. Update navigation in `Layout.js`
4. Add mock data to `src/api/base44Client.js`

### Modifying Security Events
Update the mock data in `src/api/base44Client.js` with your specific:
- Event types and severity levels
- Asset names and IP ranges  
- Protocol-specific details
- Custom reasoning chains

### Styling Changes
- **Colors**: Modify CSS variables in `src/index.css`
- **Components**: Update TailwindCSS classes in component files
- **Layout**: Adjust grid systems and spacing in page components

## Production Deployment

For production use:

1. **Replace Mock API**: Connect to real cybersecurity data sources
2. **Add Authentication**: Implement role-based access control
3. **Real-time Updates**: WebSocket connections for live event streaming
4. **Data Persistence**: Database integration for historical analysis
5. **Performance**: Implement virtualization for large event lists

## License

MIT License - See LICENSE file for details

---

**Note**: This dashboard contains mock data for demonstration purposes. In production, connect to real cybersecurity monitoring systems and implement proper authentication and authorization.