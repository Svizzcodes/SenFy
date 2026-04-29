import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { MetricCard } from '@/components/MetricCard';
import { FilterBar } from '@/components/FilterBar';
import { DataUpload } from '@/components/DataUpload';
import { useData } from '@/contexts/DataContext';
import { DollarSign, TrendingDown, BarChart3, Activity, Heart, Shield } from 'lucide-react';
import { PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, LineChart, Line } from 'recharts';

export default function Overview() {
  const { monthlyData, expenseCategories, sentimentOverview } = useData();
  const [timePeriod, setTimePeriod] = useState('Last Year');

  const filteredData = useMemo(() => {
    if (timePeriod === 'Last 7 Days') return monthlyData.slice(-1);
    if (timePeriod === 'Last 30 Days') return monthlyData.slice(-2);
    if (timePeriod === 'Last Quarter') return monthlyData.slice(-3);
    return monthlyData;
  }, [timePeriod, monthlyData]);

  const totalRevenue = filteredData.reduce((s, d) => s + d.revenue, 0);
  const totalExpenses = filteredData.reduce((s, d) => s + d.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const cashFlow = filteredData.reduce((s, d) => s + d.cashFlow, 0);

  const fmt = (n: number) => n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${(n / 1e3).toFixed(0)}K`;

  return (
    <DashboardLayout>
      {/* Upload Section */}
      <div className="mb-6">
        <DataUpload />
      </div>

      <FilterBar timePeriod={timePeriod} onTimePeriodChange={setTimePeriod} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <MetricCard title="Total Revenue" value={fmt(totalRevenue)} change="+12.5%" trend="up" icon={<DollarSign className="w-5 h-5" />} />
        <MetricCard title="Total Expenses" value={fmt(totalExpenses)} change="+3.2%" trend="up" icon={<TrendingDown className="w-5 h-5" />} />
        <MetricCard title="Net Profit" value={fmt(netProfit)} change="+18.4%" trend="up" icon={<BarChart3 className="w-5 h-5" />} />
        <MetricCard title="Cash Flow" value={fmt(cashFlow)} change="-2.1%" trend="down" icon={<Activity className="w-5 h-5" />} />
        <MetricCard title="Sentiment" value={`${sentimentOverview.overall}%`} change="+5pts" trend="up" icon={<Heart className="w-5 h-5" />} />
        <MetricCard title="Risk Index" value="Low" change="Stable" trend="stable" icon={<Shield className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-sm mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(185, 72%, 42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(185, 72%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 12 }} axisLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: 'hsl(225, 20%, 12%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 8, color: 'hsl(210, 20%, 92%)' }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(185, 72%, 42%)" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-sm mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={expenseCategories} dataKey="amount" nameKey="category" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3}>
                {expenseCategories.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(225, 20%, 12%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 8, color: 'hsl(210, 20%, 92%)' }} formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {expenseCategories.map(c => (
              <div key={c.category} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                <span className="text-muted-foreground">{c.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 lg:col-span-2">
          <h3 className="font-display font-semibold text-sm mb-4">Sentiment Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 12 }} axisLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: 'hsl(225, 20%, 12%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 8, color: 'hsl(210, 20%, 92%)' }} />
              <Line type="monotone" dataKey="sentiment" stroke="hsl(38, 92%, 52%)" strokeWidth={2} dot={{ r: 4, fill: 'hsl(38, 92%, 52%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
