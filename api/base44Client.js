// Mock Base44 Client - simulates the API layer with local data
import {
  mockAgentMetrics,
  mockSecurityEvents,
  mockDataQualityChecks,
  mockOTAssets,
  mockOTProtocolEvents,
  mockVerificationEvents,
  mockComplianceChecks
} from './mockData';

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Generic entity operations
class EntityClient {
  constructor(data) {
    this.data = data;
  }

  async list(sortBy = '-created_date', limit = null) {
    await delay();
    let results = [...this.data];
    
    // Simple sorting
    if (sortBy) {
      const isDesc = sortBy.startsWith('-');
      const field = isDesc ? sortBy.substring(1) : sortBy;
      results.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return isDesc ? -comparison : comparison;
      });
    }
    
    if (limit) {
      results = results.slice(0, limit);
    }
    
    return results;
  }

  async filter(criteria, sortBy = '-created_date') {
    await delay();
    let results = this.data.filter(item => {
      return Object.entries(criteria).every(([key, value]) => item[key] === value);
    });
    
    // Simple sorting
    if (sortBy) {
      const isDesc = sortBy.startsWith('-');
      const field = isDesc ? sortBy.substring(1) : sortBy;
      results.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return isDesc ? -comparison : comparison;
      });
    }
    
    return results;
  }

  async get(id) {
    await delay();
    return this.data.find(item => item.id === id);
  }
}

// Mock Base44 client
export const base44 = {
  entities: {
    AgentMetric: new EntityClient(mockAgentMetrics),
    SecurityEvent: new EntityClient(mockSecurityEvents),
    DataQualityCheck: new EntityClient(mockDataQualityChecks),
    OTAsset: new EntityClient(mockOTAssets),
    OTProtocolEvent: new EntityClient(mockOTProtocolEvents),
    VerificationEvent: new EntityClient(mockVerificationEvents),
    ComplianceCheck: new EntityClient(mockComplianceChecks),
  }
};

// Utility function for creating page URLs (keeping original implementation)
export const createPageUrl = (pageName) => {
  return `/${pageName.toLowerCase().replace(/ /g, '-')}`;
};
