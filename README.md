# Energy Defense - Agent Monitoring Dashboard

A modern, responsive cybersecurity dashboard for OT (Operational Technology) managers to monitor and manage multiple security agents in real-time.

## 🚀 Features

- **Real-time Monitoring**: Live updates of agent status and security events
- **3-Layer Design Architecture**: 
  - Top: Primary KPI metrics (1-3 key numbers)
  - Middle: Core data visualizations
  - Bottom: Alert tables and decision explanations
- **Interactive Ticket Details**: Click on tickets to view detailed reasoning chains
- **Clickable Asset Cards**: Click on OT assets to view comprehensive details
- **Mock Data Layer**: Fully functional with realistic fake data for demonstration

## 📊 Agent Types

1. **Email Verification Agent**: AI-powered abuse detection with explainable reasoning
2. **Email Recording Agent**: Data integrity and privacy compliance monitoring
3. **OT Tracking Agent**: SCADA/OT passive monitoring and baseline analysis

## 🛠️ Tech Stack

- **React 18** - Modern UI framework
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **Lucide React** - Icon library
- **date-fns** - Date formatting

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   - The app will automatically open at `http://localhost:3000`
   - Or manually navigate to the URL shown in your terminal

## 🏗️ Project Structure

```
/workspace
├── api/
│   ├── base44Client.js       # Mock API client
│   └── mockData.js            # Realistic fake data
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── card.jsx
│   │   ├── button.jsx
│   │   ├── badge.jsx
│   │   ├── textarea.jsx
│   │   └── table.jsx
│   ├── Agents/               # Agent-specific components
│   │   ├── KPICard.js
│   │   └── EventTable.js
│   └── Dashboard/            # Dashboard components
│       ├── MetricCard.js
│       ├── AlertFeed.js
│       ├── ComplianceStatus.js
│       └── OTAssetGrid.js
├── Pages/
│   ├── Home.js               # Main dashboard
│   ├── EmailVerificationAgent.js
│   ├── EmailRecordingAgent.js
│   └── OTAgent.js
├── Entities/                 # Data schemas (JSON)
├── Layout.js                 # Main layout wrapper
├── App.jsx                   # App router
├── main.jsx                  # Entry point
├── index.css                 # Global styles
└── package.json
```

## 🎨 Design Principles

### Consistency
- **Dark theme**: Slate background with blue/amber/red highlights
- **Uniform spacing**: Consistent margins and padding across all pages
- **Typography**: Standardized font sizes and weights
- **Color palette**:
  - 🟢 Green (Emerald): Normal/Healthy status
  - 🟡 Amber: Warning/Watch status
  - 🔴 Red: Critical/Action required
  - 🔵 Blue: Information/Neutral

### 3-Layer Structure
Each agent page follows this consistent pattern:

1. **Top Layer** - Primary KPIs (1-3 metrics maximum)
   - Large, prominent numbers
   - Clear status indicators
   - Minimal text

2. **Middle Layer** - Core Visualization
   - Time-series charts
   - Heatmaps
   - Status grids
   - Main insights

3. **Bottom Layer** - Alert Tables
   - Recent events
   - Decision explanations
   - Historical data

### Interactivity
- **Expandable Tickets**: Click to reveal detailed reasoning chains
- **Asset Details**: Click on OT assets to view full specifications
- **Responsive Feedback**: Visual feedback for all interactions
- **Loading States**: Smooth transitions with proper loading indicators

## 🔧 Configuration

### Mock Data
All data is generated in `/api/mockData.js`. You can:
- Adjust metric values
- Add more security events
- Modify asset configurations
- Change time ranges

### Styling
Customize the theme in `tailwind.config.js`:
- Colors
- Spacing
- Border radius
- Animations

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- 💻 Desktop (1920px and above)
- 💻 Laptop (1440px - 1920px)
- 📱 Tablet (768px - 1440px)
- 📱 Mobile (320px - 768px)

## 🚦 Status Indicators

### Metric Status
- **NORMAL** (Green): Operating within expected parameters
- **WATCH** (Amber): Approaching threshold, monitoring required
- **ACTION** (Red): Immediate attention required

### Asset Status
- **Online** (Green pulse): Asset communicating normally
- **Anomaly** (Red pulse): Baseline deviation detected
- **Offline** (Gray): No recent communication

## 🔐 Security Events

The system tracks various event types:
- Verification token reuse
- IP velocity bursts
- Email bounce spikes
- Failed login bursts
- Data integrity violations
- OT protocol anomalies
- Unauthorized OT flows

## 📊 Key Metrics

### Email Verification Agent
- Flagged Tickets (24h)
- Human Agreement Rate
- Confidence Scores

### Email Recording Agent
- Data Completeness
- PII Compliance
- Integrity Violations

### OT Tracking Agent
- Asset Coverage
- Baseline Deviations
- Unauthorized Flows

## 🎯 Best Practices

1. **Clean Dashboard**: Keep the main view uncluttered
2. **Detailed Views**: Use expandable sections for details
3. **Consistent Layout**: Follow the 3-layer structure
4. **Visual Hierarchy**: Use size and color to indicate importance
5. **Real-time Updates**: Data refreshes every 30 seconds

## 🤝 Contributing

This is a demonstration project. To extend it:

1. Replace mock data with real API calls
2. Add authentication and user management
3. Implement data persistence
4. Add more sophisticated visualizations
5. Enhance filtering and search capabilities

## 📄 License

This project is for demonstration purposes.

## 🆘 Support

For issues or questions:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure Node.js version 18+ is being used

## 🎉 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**Built with ❤️ for OT Security Teams**
