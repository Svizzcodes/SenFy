import { DashboardLayout } from '@/components/DashboardLayout';
import { MetricCard } from '@/components/MetricCard';
import { useData } from '@/contexts/DataContext';
import { Heart, ThumbsUp, ThumbsDown, Minus, TrendingUp, TrendingDown, Map as MapIcon, Activity, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';

export default function SentimentAnalytics() {
  const { sentimentOverview, aspectSentiment, topComplaints, liveSignals, regionalInsights, monthlyData } = useData();

  // Safety checks & Data transformations
  const chartData = monthlyData || [];
  const radarData = (aspectSentiment || []).map(a => ({
    name: a.name,
    positive: a.score,
    negative: 100 - a.score,
    full: 100
  }));
  
  const barData = (aspectSentiment || []).map(a => ({
    aspect: a.name,
    score: a.score,
  }));

  const complaints = topComplaints || [];
  const regions = regionalInsights || [];

  return (
    <DashboardLayout>
      <div className="select-none space-y-6 pb-12">
        {/* 1. Overall Sentiment Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Overall Sentiment" value={`${sentimentOverview?.overall || 0}%`} change="+5pts" trend="up" icon={<Heart className="w-5 h-5" />} />
          <MetricCard title="Positive" value={`${sentimentOverview?.positive || 0}%`} change="+3%" trend="up" icon={<ThumbsUp className="w-5 h-5" />} />
          <MetricCard title="Neutral" value={`${sentimentOverview?.neutral || 0}%`} change="-1%" trend="stable" icon={<Minus className="w-5 h-5" />} />
          <MetricCard title="Negative" value={`${sentimentOverview?.negative || 0}%`} change="-2%" trend="up" icon={<ThumbsDown className="w-5 h-5" />} />
        </div>

        {/* 2. Visual Intelligence (The Graphs) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Sentiment Trajectory */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/80">Sentiment Trajectory</h3>
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Confidence 94%
              </div>
            </div>
            <div className="h-[280px] w-full">
              {chartData.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ background: 'hsl(225, 20%, 12%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 12 }} 
                      itemStyle={{ color: 'hsl(14, 100%, 50%)', fontSize: 12, fontWeight: 'bold' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sentiment" 
                      stroke="hsl(14, 100%, 50%)" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: 'hsl(14, 100%, 50%)', strokeWidth: 2, stroke: '#fff' }} 
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Dual Aspect Radar (Green/Red) */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/80">Aspect Pulse Radar</h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-1.5 text-[8px] font-black uppercase text-success">
                   <div className="w-2 h-2 rounded-full bg-success/80" /> Positive
                 </div>
                 <div className="flex items-center gap-1.5 text-[8px] font-black uppercase text-destructive">
                   <div className="w-2 h-2 rounded-full bg-destructive/80" /> Negative
                 </div>
              </div>
            </div>
            <div className="h-[280px] w-full">
              {radarData.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(220, 16%, 18%)" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 10, fontWeight: 'black' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar 
                      name="Positive" 
                      dataKey="positive" 
                      stroke="hsl(160, 72%, 38%)" 
                      fill="hsl(160, 72%, 38%)" 
                      fillOpacity={0.4} 
                    />
                    <Radar 
                      name="Negative" 
                      dataKey="negative" 
                      stroke="hsl(0, 72%, 52%)" 
                      fill="hsl(0, 72%, 52%)" 
                      fillOpacity={0.2} 
                    />
                    <Tooltip contentStyle={{ background: 'hsl(225, 20%, 12%)', border: 'none', borderRadius: 8 }} />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* 3. Aspect Breakdown (Bar Chart - RE-ADDED) */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-black uppercase tracking-wider">Aspect-Based Sentiment Distribution</h3>
          </div>
          <div className="h-[200px] w-full">
            {barData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ left: 40, right: 40 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="aspect" type="category" axisLine={false} tickLine={false} tick={{ fill: 'white', fontSize: 11, fontWeight: 'bold' }} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: 'hsl(225, 20%, 12%)', border: 'none' }} />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                    {barData.map((entry, index) => (
                      <Cell key={index} fill={entry.score > 75 ? 'hsl(160, 72%, 38%)' : entry.score > 50 ? 'hsl(38, 92%, 52%)' : 'hsl(0, 72%, 52%)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 4. Live Signals */}
          <div className="lg:col-span-2 glass-card p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg uppercase tracking-wider">Signal Intelligence Hub</h3>
              </div>
              <div className="text-[10px] font-black px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 tracking-widest animate-pulse">LIVE FEED</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-success flex items-center gap-2 mb-3">
                  <ThumbsUp className="w-3 h-3" /> Growth Catalysts
                </h4>
                {liveSignals?.positive?.slice(0, 5).map((signal: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl bg-success/5 border border-success/10 hover:border-success/30 transition-all">
                    <p className="text-xs italic mb-2 leading-relaxed">"{signal.text}"</p>
                    <div className="flex justify-between items-center text-[10px] font-black">
                      <span className="text-success/50 uppercase tracking-tighter">{signal.aspect}</span>
                      <span className="text-success">{signal.agreement}% Agreement</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-destructive flex items-center gap-2 mb-3">
                  <ThumbsDown className="w-3 h-3" /> Friction Sources
                </h4>
                {liveSignals?.negative?.slice(0, 5).map((signal: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl bg-destructive/5 border border-destructive/10 hover:border-destructive/30 transition-all">
                    <p className="text-xs italic mb-2 leading-relaxed">"{signal.text}"</p>
                    <div className="flex justify-between items-center text-[10px] font-black">
                      <span className="text-destructive/50 uppercase tracking-tighter">{signal.aspect}</span>
                      <span className="text-destructive">{signal.agreement}% Agreement</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Sidebar Analytics */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-black text-sm mb-6 uppercase tracking-wider text-primary/80">Structural Complaints</h3>
              <div className="space-y-5">
                {complaints.slice(0, 5).map((item: any) => (
                  <div key={item.keyword} className="space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-bold">
                      <div className="flex items-center gap-2">
                         {item.trend === 'up' ? <TrendingUp className="w-3 h-3 text-red-400" /> : <TrendingDown className="w-3 h-3 text-green-400" />}
                         <span className="uppercase tracking-tight">{item.keyword}</span>
                      </div>
                      <span className="text-muted-foreground">{item.count} reports</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${item.trend === 'up' ? 'bg-red-500' : 'bg-green-500'}`} 
                        style={{ width: `${Math.min((item.count / 700) * 100, 100)}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 border-primary/20">
              <div className="flex items-center gap-2 mb-6">
                <MapIcon className="w-4 h-4 text-primary" />
                <h3 className="font-black text-xs uppercase tracking-wider">Regional Sentiment Saturation</h3>
              </div>
              <div className="space-y-4">
                {regions.slice(0, 4).map((item: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/20 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase">{item.region}</span>
                      <span className={`text-[9px] font-black px-2 py-1 rounded-full ${
                        item.status === 'Strong' ? 'bg-success/20 text-success' : 
                        item.status === 'Moderate' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-destructive/20 text-destructive'
                      }`}>{item.status.toUpperCase()}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
