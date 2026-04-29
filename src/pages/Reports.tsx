import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { generateInsights } from '@/data/mockData';
import { generatePdfReport } from '@/utils/generatePdfReport';
import { FileText, Download, Loader2, Shield, BarChart3, Heart, Lightbulb } from 'lucide-react';

export default function Reports() {
  const { user } = useAuth();
  const { monthlyData, expenseCategories, sentimentOverview, insights, liveSignals, regionalInsights, marketingIntelligence, revenueByProduct } = useData();
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const totalRev = monthlyData.reduce((s, d) => s + d.revenue, 0);
  const totalExp = monthlyData.reduce((s, d) => s + d.expenses, 0);

  const downloadReport = () => {
    setGenerating(true);
    setTimeout(() => {
      generatePdfReport({
        companyName: user?.companyName || 'Company',
        monthlyData,
        expenseCategories,
        sentimentOverview,
        insights,
        liveSignals,
        regionalInsights,
        marketingTrends: marketingIntelligence?.trends || [],
        revenueByProduct,
      });
      setGenerating(false);
      setGenerated(true);
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold">Generate Professional Report</h2>
        </div>

        <div className="glass-card p-6 mb-6">
          <h3 className="font-display font-semibold text-sm mb-4">Report Contents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: BarChart3, label: 'Financial Summary', desc: 'Revenue, Expenses, Profit, Margins, Cash Flow' },
              { icon: Heart, label: 'Sentiment Analysis', desc: 'Overall score, Positive/Negative/Neutral breakdown' },
              { icon: Lightbulb, label: 'AI-Powered Insights', desc: 'Correlation engine, Why analysis, Recommendations' },
              { icon: Shield, label: 'Security & Branding', desc: 'Watermarked, Timestamped, Company branded' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="glass-card p-6 mb-6">
          <h3 className="font-display font-semibold text-sm mb-4">Report Preview</h3>
          <div className="bg-secondary/50 rounded-lg p-4 space-y-4 text-xs font-mono">
            <div>
              <p className="text-muted-foreground">── Financial ──</p>
              <p>Revenue: ${totalRev.toLocaleString()}</p>
              <p>Expenses: ${totalExp.toLocaleString()}</p>
              <p>Net Profit: ${(totalRev - totalExp).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">── Sentiment ──</p>
              <p>Overall: {sentimentOverview.overall}% | Positive: {sentimentOverview.positive}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">── Top Insight ──</p>
              <p>{insights[0]?.trigger}: {insights[0]?.action}</p>
            </div>
          </div>
        </div>

        <button
          onClick={downloadReport}
          disabled={generating}
          className="w-full h-12 rounded-lg gradient-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {generating ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Generating PDF...</>
          ) : (
            <><Download className="w-5 h-5" /> Download Professional PDF Report</>
          )}
        </button>

        {generated && (
          <p className="text-center text-xs text-success mt-3 animate-fade-in">✓ PDF Report downloaded successfully — watermarked & branded</p>
        )}
      </div>
    </DashboardLayout>
  );
}
