import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { FilterBar } from '@/components/FilterBar';
import { REVENUE_BY_REGION, SENTIMENT_BY_REGION } from '@/data/mockData';
import { Globe, X } from 'lucide-react';

const REGION_COORDS: Record<string, { top: string; left: string; width: string }> = {
  'North America': { top: '15%', left: '8%', width: '22%' },
  'Europe': { top: '10%', left: '38%', width: '18%' },
  'Asia Pacific': { top: '20%', left: '60%', width: '25%' },
  'Latin America': { top: '50%', left: '15%', width: '18%' },
  'Middle East': { top: '30%', left: '48%', width: '12%' },
  'Africa': { top: '40%', left: '38%', width: '16%' },
};

function getIntensity(revenue: number): string {
  const max = Math.max(...REVENUE_BY_REGION.map(r => r.revenue));
  const ratio = revenue / max;
  if (ratio > 0.8) return 'from-primary/60 to-primary/30';
  if (ratio > 0.6) return 'from-primary/45 to-primary/20';
  if (ratio > 0.4) return 'from-primary/30 to-primary/15';
  return 'from-primary/20 to-primary/8';
}

export default function WorldHeatmap() {
  const [timePeriod, setTimePeriod] = useState('Last Year');
  const [selected, setSelected] = useState<string | null>(null);

  const selectedRegion = REVENUE_BY_REGION.find(r => r.region === selected);
  const selectedSentiment = SENTIMENT_BY_REGION.find(r => r.region === selected);

  return (
    <DashboardLayout>
      <FilterBar timePeriod={timePeriod} onTimePeriodChange={setTimePeriod} />

      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-primary" />
        <h2 className="font-display font-semibold">Revenue Heatmap</h2>
        <span className="text-xs text-muted-foreground">Click a region for details</span>
      </div>

      {/* Map visualization */}
      <div className="glass-card p-6 mb-6">
        <div className="relative w-full" style={{ paddingBottom: '50%' }}>
          <div className="absolute inset-0 rounded-xl bg-secondary/30 overflow-hidden">
            {REVENUE_BY_REGION.map(region => {
              const coords = REGION_COORDS[region.region];
              const sentiment = SENTIMENT_BY_REGION.find(s => s.region === region.region);
              return (
                <button
                  key={region.region}
                  onClick={() => setSelected(selected === region.region ? null : region.region)}
                  className={`absolute rounded-xl bg-gradient-to-br ${getIntensity(region.revenue)} border transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center cursor-pointer ${
                    selected === region.region ? 'border-primary glow-primary z-10 scale-105' : 'border-border/30'
                  }`}
                  style={{ top: coords.top, left: coords.left, width: coords.width, height: '35%' }}
                >
                  <span className="text-xs font-display font-semibold">{region.region}</span>
                  <span className="text-[10px] text-muted-foreground">${(region.revenue / 1e6).toFixed(1)}M</span>
                  {sentiment && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${sentiment.positive > 50 ? 'bg-success' : 'bg-destructive'}`} />
                      <span className="text-[10px]">{sentiment.positive}%</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded bg-gradient-to-r from-primary/20 to-primary/60" />
            <span className="text-xs text-muted-foreground">Revenue Intensity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">Positive Sentiment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">Negative Sentiment</span>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && selectedRegion && selectedSentiment && (
        <div className="glass-card p-5 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">{selected} — Detail View</h3>
            <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-secondary"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground">Revenue</p>
              <p className="text-lg font-display font-bold">${(selectedRegion.revenue / 1e6).toFixed(2)}M</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground">Growth</p>
              <p className="text-lg font-display font-bold text-success">+{selectedRegion.growth}%</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground">Positive Sentiment</p>
              <p className="text-lg font-display font-bold">{selectedSentiment.positive}%</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground">Negative Sentiment</p>
              <p className="text-lg font-display font-bold text-destructive">{selectedSentiment.negative}%</p>
            </div>
          </div>
        </div>
      )}

      {/* All Regions Table */}
      <div className="glass-card p-5 mt-6">
        <h3 className="font-display font-semibold text-sm mb-4">All Regions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted-foreground font-medium">Region</th>
                <th className="text-right py-2 text-muted-foreground font-medium">Revenue</th>
                <th className="text-right py-2 text-muted-foreground font-medium">Growth</th>
                <th className="text-right py-2 text-muted-foreground font-medium">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {REVENUE_BY_REGION.map(r => (
                <tr key={r.region} className="border-b border-border/30 hover:bg-secondary/20 cursor-pointer" onClick={() => setSelected(r.region)}>
                  <td className="py-2.5">{r.region}</td>
                  <td className="py-2.5 text-right">${(r.revenue / 1e6).toFixed(2)}M</td>
                  <td className="py-2.5 text-right text-success">+{r.growth}%</td>
                  <td className="py-2.5 text-right">{r.sentiment}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
