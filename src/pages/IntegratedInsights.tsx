import { DashboardLayout } from '@/components/DashboardLayout';
import { useData } from '@/contexts/DataContext';
import { generateInsights } from '@/data/mockData';
import { Lightbulb, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SEVERITY_STYLES = {
  high: 'border-destructive/50 bg-destructive/5',
  medium: 'border-accent/50 bg-accent/5',
  low: 'border-success/50 bg-success/5',
};

const SEVERITY_BADGE = {
  high: 'bg-destructive/20 text-destructive',
  medium: 'bg-accent/20 text-accent',
  low: 'bg-success/20 text-success',
};

export default function IntegratedInsights() {
  const { monthlyData } = useData();
  const insights = generateInsights(monthlyData);

  const correlationData = monthlyData.map(d => ({
    revenue: d.revenue,
    sentiment: d.sentiment,
    month: d.month,
  }));

  // Quadrant data
  const quadrantData = [
    { name: 'SaaS Platform', revenue: 85, sentiment: 78, size: 120 },
    { name: 'API Services', revenue: 72, sentiment: 65, size: 80 },
    { name: 'Consulting', revenue: 45, sentiment: 82, size: 60 },
    { name: 'Data Analytics', revenue: 68, sentiment: 55, size: 90 },
    { name: 'Cloud Storage', revenue: 55, sentiment: 42, size: 70 },
  ];

  return (
    <DashboardLayout>
      {/* Insights Panel */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-accent" />
          <h2 className="font-display font-semibold">AI-Powered Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map(insight => (
            <div key={insight.id} className={`glass-card p-5 border ${SEVERITY_STYLES[insight.severity]} animate-fade-in`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {insight.severity === 'high' ? <AlertTriangle className="w-4 h-4 text-destructive" /> : <TrendingUp className="w-4 h-4 text-primary" />}
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${SEVERITY_BADGE[insight.severity]}`}>{insight.severity.toUpperCase()}</span>
                </div>
                <span className="text-xs text-muted-foreground">Confidence: {insight.confidence}%</span>
              </div>

              <h4 className="font-display font-semibold text-sm mb-2">{insight.trigger}</h4>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Sentiment Factor:</span>
                  <p className="text-foreground mt-0.5">{insight.sentimentFactor}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Suggested Action:</span>
                  <p className="text-foreground mt-0.5">{insight.action}</p>
                </div>
              </div>

              <div className="mt-3 h-1 bg-secondary rounded-full overflow-hidden">
                <div className="h-full gradient-primary rounded-full" style={{ width: `${insight.confidence}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Sentiment Correlation */}
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-sm mb-4">Revenue vs Sentiment Correlation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis dataKey="sentiment" name="Sentiment" tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 12 }} axisLine={false} label={{ value: 'Sentiment Score', position: 'bottom', fill: 'hsl(215, 12%, 50%)', fontSize: 11 }} />
              <YAxis dataKey="revenue" name="Revenue" tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 12 }} axisLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: 'hsl(225, 20%, 12%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 8, color: 'hsl(210, 20%, 92%)' }} formatter={(v: number, name: string) => [name === 'Revenue' ? `$${v.toLocaleString()}` : `${v}%`, name]} />
              <Scatter data={correlationData} fill="hsl(185, 72%, 42%)" />
            </ScatterChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground text-center mt-2">Correlation coefficient: r = 0.84 (strong positive)</p>
        </div>

        {/* Performance Quadrant */}
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-sm mb-4">Performance Quadrant Matrix</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis dataKey="sentiment" name="Sentiment" tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 12 }} axisLine={false} domain={[0, 100]} label={{ value: 'Sentiment', position: 'bottom', fill: 'hsl(215, 12%, 50%)', fontSize: 11 }} />
              <YAxis dataKey="revenue" name="Revenue" tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 12 }} axisLine={false} domain={[0, 100]} label={{ value: 'Revenue', angle: -90, position: 'insideLeft', fill: 'hsl(215, 12%, 50%)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'hsl(225, 20%, 12%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 8, color: 'hsl(210, 20%, 92%)' }} />
              <Scatter data={quadrantData} fill="hsl(38, 92%, 52%)">
                {quadrantData.map((_, i) => {
                  const colors = ['hsl(185, 72%, 42%)', 'hsl(38, 92%, 52%)', 'hsl(160, 72%, 38%)', 'hsl(280, 60%, 55%)', 'hsl(0, 72%, 52%)'];
                  return <circle key={i} r={6} fill={colors[i]} />;
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {quadrantData.map((d, i) => {
              const colors = ['hsl(185, 72%, 42%)', 'hsl(38, 92%, 52%)', 'hsl(160, 72%, 38%)', 'hsl(280, 60%, 55%)', 'hsl(0, 72%, 52%)'];
              return (
                <div key={d.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: colors[i] }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
