# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
Navigate to: `http://localhost:3000`

---

## 📱 What You'll See

### Main Dashboard (`/`)
- System overview with 3 primary KPIs
- Real-time agent status cards (clickable to navigate)
- Recent security events feed

### Email Verification Agent (`/emailverificationagent`)
- Flagged tickets with AI reasoning
- **Click on any ticket** to see:
  - Detailed reasoning chain
  - Event metadata (IP, user-agent, geo-location, etc.)
  - Human feedback interface

### Email Recording Agent (`/emailrecordingagent`)
- Data completeness, PII compliance, and integrity metrics
- Compliance controls status
- Data quality checks table

### OT Tracking Agent (`/ottrackingagent`)
- Asset coverage and baseline deviation metrics
- **Click on any asset card** to see:
  - Full technical specifications
  - Firmware version and vendor info
  - Status and baseline information
- Recent protocol events

---

## ⚡ Key Interactions

### Expandable Tickets (Email Verification)
1. Click on any flagged ticket
2. View the AI reasoning chain step-by-step
3. See additional event details
4. Provide human feedback (Confirm/Dispute)
5. Add optional training notes

### Clickable Assets (OT Tracking)
1. Click on any asset card in the grid
2. Detailed panel appears below showing:
   - IP and MAC addresses
   - Protocol and role information
   - Firmware version and vendor
   - Baseline status

### Navigation
- Use the top nav bar to switch between agents
- Click "Home" to return to the main dashboard
- All links are instant (client-side routing)

---

## 🎨 Design Features

### Color Coding
- 🟢 **Green (Emerald)**: Normal/Healthy status
- 🟡 **Amber**: Warning/Watch status  
- 🔴 **Red**: Critical/Action required
- 🔵 **Blue**: Informational

### Status Indicators
- **Pulsing dots**: Real-time status
- **Border highlights**: Selected items
- **Hover effects**: Interactive elements

### Responsive Design
- Desktop: Full 3-column layout
- Tablet: 2-column adaptive layout
- Mobile: Single column stacked layout

---

## 📊 Mock Data

All data is generated locally in `/api/mockData.js`:

- **6 Security Events** across different severities
- **6 Verification Tickets** with detailed reasoning chains
- **8 OT Assets** with full specifications
- **5 Data Quality Checks** with various statuses
- **12 Agent Metrics** (4 per agent)

Data refreshes automatically every 30 seconds.

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

### Dependencies Won't Install
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Build Issues
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

## 🎯 What's Next?

### To Make This Production-Ready:
1. Replace mock data with real API endpoints
2. Add authentication and user management
3. Implement WebSocket for real-time updates
4. Add data persistence (database)
5. Enhance filtering and search
6. Add export/reporting capabilities
7. Implement role-based access control

---

## 💡 Tips

- **Keep the main dashboard clean** - Details are just a click away
- **Use the 3-layer structure** for consistency
- **Color indicates urgency** - Red requires immediate attention
- **All timestamps are relative** - "5 minutes ago" vs absolute times

---

**Enjoy exploring the dashboard! 🎉**
