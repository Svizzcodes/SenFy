// ── Month labels ──
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ── Regions ──
export const REGIONS = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa'];

// ── Products ──
export const PRODUCTS = ['SaaS Platform', 'API Services', 'Consulting', 'Data Analytics', 'Cloud Storage'];

// ── Monthly financial data ──
export const MONTHLY_DATA = MONTHS.map((month, i) => ({
  month,
  revenue: Math.round(320000 + Math.sin(i * 0.8) * 80000 + i * 15000 + Math.random() * 20000),
  expenses: Math.round(180000 + Math.cos(i * 0.6) * 30000 + i * 5000 + Math.random() * 10000),
  profit: 0,
  sentiment: Math.round(58 + Math.sin(i * 0.5) * 18 + Math.random() * 8),
  cashFlow: 0,
})).map(d => ({ ...d, profit: d.revenue - d.expenses, cashFlow: d.revenue - d.expenses - Math.round(Math.random() * 20000) }));

export const REVENUE_BY_REGION = [
  { region: 'North America', revenue: 450000000, growth: 12, sentiment: 82 },
  { region: 'Europe', revenue: 280000000, growth: 8, sentiment: 75 },
  { region: 'Asia Pacific', revenue: 350000000, growth: 18, sentiment: 88 },
  { region: 'Latin America', revenue: 120000000, growth: 5, sentiment: 68 },
  { region: 'Middle East', revenue: 95000000, growth: -2, sentiment: 45 },
  { region: 'Africa', revenue: 45000000, growth: 15, sentiment: 55 },
];

// ── Revenue by product ──
export const REVENUE_BY_PRODUCT = PRODUCTS.map(product => ({
  product,
  revenue: Math.round(200000 + Math.random() * 500000),
  margin: Math.round(15 + Math.random() * 45),
}));

// ── Expense categories ──
export const EXPENSE_CATEGORIES = [
  { category: 'Operations', amount: 420000, color: 'hsl(185, 72%, 42%)' },
  { category: 'Marketing', amount: 280000, color: 'hsl(38, 92%, 52%)' },
  { category: 'R&D', amount: 350000, color: 'hsl(160, 72%, 38%)' },
  { category: 'Salaries', amount: 520000, color: 'hsl(280, 60%, 55%)' },
  { category: 'Infrastructure', amount: 180000, color: 'hsl(0, 72%, 52%)' },
];

// ── Sentiment data ──
export const SENTIMENT_OVERVIEW = {
  overall: 72,
  positive: 58,
  neutral: 25,
  negative: 17,
};

export const ASPECT_SENTIMENT = [
  { aspect: 'Product Quality', positive: 78, negative: 12, neutral: 10 },
  { aspect: 'Customer Support', positive: 45, negative: 35, neutral: 20 },
  { aspect: 'Pricing', positive: 32, negative: 48, neutral: 20 },
  { aspect: 'User Experience', positive: 68, negative: 18, neutral: 14 },
  { aspect: 'Delivery Speed', positive: 55, negative: 28, neutral: 17 },
];

export const TOP_COMPLAINTS = [
  { keyword: 'slow response', count: 342, trend: 'up' as const },
  { keyword: 'pricing concerns', count: 287, trend: 'up' as const },
  { keyword: 'bug reports', count: 198, trend: 'down' as const },
  { keyword: 'missing features', count: 156, trend: 'stable' as const },
  { keyword: 'onboarding issues', count: 134, trend: 'down' as const },
];

export const SENTIMENT_BY_REGION = [
  { region: 'North America', positive: 65, neutral: 25, negative: 10 },
  { region: 'Europe', positive: 58, neutral: 30, negative: 12 },
  { region: 'Asia Pacific', positive: 75, neutral: 20, negative: 5 },
  { region: 'Latin America', positive: 45, neutral: 35, negative: 20 },
  { region: 'Middle East', positive: 30, neutral: 30, negative: 40 },
  { region: 'Africa', positive: 50, neutral: 30, negative: 20 },
];

// ── Customer segments ──
export const CUSTOMER_SEGMENTS = [
  { segment: 'Enterprise', count: 45, revenue: 2800000, satisfaction: 82 },
  { segment: 'Mid-Market', count: 180, revenue: 1900000, satisfaction: 74 },
  { segment: 'SMB', count: 620, revenue: 980000, satisfaction: 68 },
  { segment: 'Startup', count: 340, revenue: 420000, satisfaction: 71 },
];

// ── Alerts ──
export interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  timestamp: string;
  metric?: string;
  value?: string;
}

export const INITIAL_ALERTS: Alert[] = [
  { id: '1', type: 'danger', title: 'Revenue Drop Detected', message: 'North America revenue dropped 12% vs last month', timestamp: '2 min ago', metric: 'Revenue', value: '-12%' },
  { id: '2', type: 'warning', title: 'Negative Sentiment Spike', message: 'Customer support sentiment dropped below threshold', timestamp: '15 min ago', metric: 'Sentiment', value: '38%' },
  { id: '3', type: 'warning', title: 'Expense Anomaly', message: 'Marketing spend exceeded budget by 23%', timestamp: '1 hr ago', metric: 'Expenses', value: '+23%' },
  { id: '4', type: 'info', title: 'New Region Data', message: 'Asia Pacific Q4 data now available', timestamp: '3 hr ago' },
];

// ── Time period options ──
export const TIME_PERIODS = ['Last 7 Days', 'Last 30 Days', 'Last Quarter', 'Last Year', 'All Time'];

// ── Insights generation ──
export function generateInsights(data: typeof MONTHLY_DATA) {
  if (!data || data.length < 2) return [];
  const latest = data[data.length - 1];
  const prev = data[data.length - 2];
  const insights = [];

  if (latest.revenue < prev.revenue && latest.sentiment < 60) {
    insights.push({
      id: 'rev-sent-1',
      trigger: 'Revenue Decline + Negative Sentiment',
      sentimentFactor: 'Customer support complaints increased 28%',
      action: 'Prioritize customer support improvements and launch retention campaign in affected regions',
      confidence: 87,
      severity: 'high' as const,
    });
  }

  if (latest.expenses > latest.revenue * 0.7) {
    insights.push({
      id: 'exp-ratio-1',
      trigger: 'High Expense Ratio',
      sentimentFactor: 'Pricing concerns rising in SMB segment',
      action: 'Review operational costs and consider tiered pricing adjustment',
      confidence: 74,
      severity: 'medium' as const,
    });
  }

  insights.push({
    id: 'growth-1',
    trigger: 'Growth Opportunity Detected',
    sentimentFactor: 'Product quality sentiment at 78% positive',
    action: 'Expand into Asia Pacific with current product line — high satisfaction signal',
    confidence: 82,
    severity: 'low' as const,
  });

  insights.push({
    id: 'corr-1',
    trigger: 'Revenue-Sentiment Correlation',
    sentimentFactor: 'Strong positive correlation (r=0.84) between sentiment and revenue',
    action: 'Invest in NPS improvement programs — projected 8% revenue lift per 10pt sentiment gain',
    confidence: 91,
    severity: 'medium' as const,
  });

  return insights;
}

// ── Marketing recommendations ──
export function getMarketingRecommendations() {
  return [
    { id: '1', type: 'region', title: 'Target Region: Asia Pacific', description: 'High sentiment (82%) with low market penetration. Revenue potential estimated at $1.2M', confidence: 88 },
    { id: '2', type: 'bundle', title: 'Bundle: SaaS + Analytics', description: 'Cross-sell data analytics to existing SaaS customers. 34% of enterprise clients expressed interest', confidence: 76 },
    { id: '3', type: 'segment', title: 'Focus: Mid-Market Segment', description: 'Highest growth rate (18% QoQ) with improving sentiment. Upsell opportunity identified', confidence: 82 },
    { id: '4', type: 'campaign', title: 'Campaign: Customer Success Stories', description: 'Leverage 78% positive product quality sentiment in content marketing', confidence: 71 },
  ];
}
