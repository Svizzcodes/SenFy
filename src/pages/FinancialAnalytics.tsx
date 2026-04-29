import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { MetricCard } from '@/components/MetricCard';
import { FilterBar } from '@/components/FilterBar';
import { useData } from '@/contexts/DataContext';
import { REGIONS, PRODUCTS } from '@/data/mockData';
import { DollarSign, Percent, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function FinancialAnalytics() {
  const { monthlyData, revenueByRegion, revenueByProduct, expenseCategories } = useData();
  const [timePeriod, setTimePeriod] = useState('Last Year');
  const [region, setRegion] = useState('all');
  
  const currentProducts = useMemo(() => {
    return revenueByProduct?.map(p => p.product) || [];
  }, [revenueByProduct]);

  const [product, setProduct] = useState('all');

  const filteredMonthly = useMemo(() => {
    let data = [...monthlyData];
    if (timePeriod === 'Last Quarter') data = data.slice(-3);
    else if (timePeriod === 'Last 30 Days') data = data.slice(-2);
    // Apply region/product multiplier for simulation
    if (region !== 'all') {
      const idx = REGIONS.indexOf(region);
      const mult = 0.6 + (idx * 0.1);
      data = data.map(d => ({ ...d, revenue: Math.round(d.revenue * mult), expenses: Math.round(d.expenses * mult) }));
    }
    if (product !== 'all') {
      const idx = currentProducts.indexOf(product);
      const mult = 0.5 + (idx * 0.12);
      data = data.map(d => ({ ...d, revenue: Math.round(d.revenue * mult), expenses: Math.round(d.expenses * mult * 0.8) }));
    }
    return data;
  }, [timePeriod, region, product, monthlyData]);

  const totalRev = filteredMonthly.reduce((s, d) => s + d.revenue, 0);
  const totalExp = filteredMonthly.reduce((s, d) => s + d.expenses, 0);
  const margin = totalRev > 0 ? ((totalRev - totalExp) / totalRev * 100).toFixed(1) : '0';
  const anomalies = filteredMonthly.filter(d => d.expenses > d.revenue * 0.75).length;
  const fmt = (n: number) => n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${(n / 1e3).toFixed(0)}K`;

  return (
    <DashboardLayout>
      <FilterBar timePeriod={timePeriod} onTimePeriodChange={setTimePeriod} region={region} onRegionChange={setRegion} product={product} onProductChange={setProduct} regions={REGIONS} products={currentProducts} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Total Revenue" value={fmt(totalRev)} change="+12.5%" trend="up" icon={<DollarSign className="w-5 h-5" />} />
        <MetricCard title="Total Expenses" value={fmt(totalExp)} change="+3.2%" trend="up" />
        <MetricCard title="Profit Margin" value={`${margin}%`} change="+2.1%" trend="up" icon={<Percent className="w-5 h-5" />} />
        <MetricCard title="Expense Anomalies" value={String(anomalies)} change={anomalies > 0 ? 'Detected' : 'None'} trend={anomalies > 0 ? 'down' : 'stable'} icon={<AlertTriangle className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Region */}
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-sm mb-4">Revenue by Region</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueByRegion}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis dataKey="region" tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 10 }} axisLine={false} />
              <YAxis tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 12 }} axisLine={false} tickFormatter={v => `$${(v / 1e6).toFixed(1)}M`} />
              <Tooltip contentStyle={{ background: 'hsl(225, 20%, 12%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 8, color: 'hsl(210, 20%, 92%)' }} />
              <Bar dataKey="revenue" fill="hsl(185, 72%, 42%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Product */}
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-sm mb-4">Revenue by Product</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueByProduct} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis type="number" tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 12 }} axisLine={false} tickFormatter={v => `$${(v / 1e6).toFixed(1)}M`} />
              <YAxis type="category" dataKey="product" tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 10 }} axisLine={false} width={100} />
              <Tooltip contentStyle={{ background: 'hsl(225, 20%, 12%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 8, color: 'hsl(210, 20%, 92%)' }} />
              <Bar dataKey="revenue" fill="hsl(38, 92%, 52%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cash Flow */}
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-sm mb-4">Cash Flow</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={filteredMonthly}>
              <defs>
                <linearGradient id="cfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 72%, 38%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160, 72%, 38%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 12 }} axisLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: 'hsl(225, 20%, 12%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 8, color: 'hsl(210, 20%, 92%)' }} />
              <Area type="monotone" dataKey="cashFlow" stroke="hsl(160, 72%, 38%)" fill="url(#cfGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
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
      </div>
    </DashboardLayout>
  );
}
