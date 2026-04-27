import React, { useState } from 'react';
import { DollarSign, TrendingUp, Activity, ShoppingCart, ArrowUp } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  FunnelChart, Funnel, LabelList
} from 'recharts';

export const FinanceMonitoringAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  // ============================================
  // MOCK DATA ONLY - No API calls
  // ============================================

  const revenueData = [
    { month: 'Jan 2026', revenue: 15000, expenses: 8000, profit: 7000 },
    { month: 'Feb 2026', revenue: 18000, expenses: 8500, profit: 9500 },
    { month: 'Mar 2026', revenue: 22000, expenses: 9000, profit: 13000 },
    { month: 'Apr 2026', revenue: 19000, expenses: 8200, profit: 10800 },
  ];

  const expenseBreakdown = [
    { category: 'Materials', amount: 35000, percentage: 52.1, color: '#f59e0b' },
    { category: 'Labor', amount: 19000, percentage: 28.3, color: '#3b82f6' },
    { category: 'Rent & Utilities', amount: 9000, percentage: 13.3, color: '#10b981' },
    { category: 'Marketing', amount: 3500, percentage: 5.0, color: '#8b5cf6' },
    { category: 'Other', amount: 1000, percentage: 1.3, color: '#6b7280' },
  ];

  const cashFlowData = [
    { week: 'Week 1', inflow: 12000, outflow: 5000 },
    { week: 'Week 2', inflow: 15000, outflow: 6000 },
    { week: 'Week 3', inflow: 10000, outflow: 4500 },
    { week: 'Week 4', inflow: 18000, outflow: 7000 },
  ];

  const salesTrendData = [
    { day: 'Apr 14', sales: 1200 },
    { day: 'Tue Apr 15', sales: 800 },
    { day: 'Wed Apr 16', sales: 1500 },
    { day: 'Thu Apr 17', sales: 1100 },
    { day: 'Fri Apr 18', sales: 2000 },
    { day: 'Sat Apr 19', sales: 2500 },
    { day: 'Sun Apr 20', sales: 1800 },
  ];

  const topSellingProducts = [
    { product: 'Egyptian Cotton Shirt', revenue: 14000 },
    { product: 'Custom Tuxedo', revenue: 10500 },
    { product: 'Linen Trousers', revenue: 7000 },
    { product: 'Round Neck Shirt', revenue: 3500 },
    { product: 'Wool Blazer', revenue: 2500 },
  ];

  const reservationFunnelData = [
    { stage: 'Website Visits', value: 2450, fill: '#f59e0b' },
    { stage: 'Appointment Booked', value: 1680, fill: '#fb923c' },
    { stage: 'Consultation Done', value: 1245, fill: '#fbbf24' },
    { stage: 'Measurement Taken', value: 892, fill: '#fcd34d' },
    { stage: 'Order Placed', value: 634, fill: '#fde68a' },
  ];

  const kpis = {
    totalSales: 28380,
    grossMargin: 41.2,
    avgOrderValue: 856.7
  };

  const tooltipStyle = {
    contentStyle: {
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '12px'
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Financial Analytics</h2>
          <p className="text-slate-500">Financial data from your sales and payment records</p>
        </div>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last 3 Months</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-white/20"><DollarSign className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium opacity-90">Total Sales Revenue</p><p className="text-xs opacity-75">Revenue</p></div>
          </div>
          <h3 className="text-3xl font-bold mb-2">₱{kpis.totalSales.toLocaleString()}</h3>
          <div className="flex items-center gap-1 text-sm"><ArrowUp className="w-4 h-4" /><span>+12.5% from last month</span></div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-white/20"><TrendingUp className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium opacity-90">Gross Profit Margin</p><p className="text-xs opacity-75">Margin</p></div>
          </div>
          <h3 className="text-3xl font-bold mb-2">{kpis.grossMargin}%</h3>
          <div className="flex items-center gap-1 text-sm"><ArrowUp className="w-4 h-4" /><span>+8.1% growth</span></div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-white/20"><Activity className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium opacity-90">Revenue Growth</p><p className="text-xs opacity-75">Growth</p></div>
          </div>
          <h3 className="text-3xl font-bold mb-2">+15.3%</h3>
          <div className="flex items-center gap-1 text-sm"><ArrowUp className="w-4 h-4" /><span>Year over year</span></div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-white/20"><ShoppingCart className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium opacity-90">Avg Order Value</p><p className="text-xs opacity-75">Value</p></div>
          </div>
          <h3 className="text-3xl font-bold mb-2">₱{kpis.avgOrderValue.toLocaleString()}</h3>
          <div className="flex items-center gap-1 text-sm"><ArrowUp className="w-4 h-4" /><span>Per transaction</span></div>
        </div>
      </div>

      {/* Revenue & Expenses + Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue & Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Revenue" />
              <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category} ${percentage}%`}
                outerRadius={100}
                dataKey="amount"
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cash Flow Analysis */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Cash Flow Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="week" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltipStyle} />
            <Legend />
            <Bar dataKey="inflow" fill="#10b981" name="Cash Inflow" radius={[8, 8, 0, 0]} />
            <Bar dataKey="outflow" fill="#ef4444" name="Cash Outflow" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Trend + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Sales Trend Line Chart</h3>
            <p className="text-sm text-slate-500">Total Sales per Day - Temporal view showing revenue patterns</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} name="Daily Sales" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Top-selling Product Bar Graph</h3>
            <p className="text-sm text-slate-500">Best-selling products ranked by revenue</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSellingProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis dataKey="product" type="category" stroke="#64748b" width={130} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 8, 8, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reservation Conversion Funnel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Reservation Conversion</h3>
          <p className="text-sm text-slate-500">Track customer journey from visit to order</p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <FunnelChart>
            <Tooltip {...tooltipStyle} />
            <Funnel dataKey="value" data={reservationFunnelData} isAnimationActive>
              <LabelList position="right" fill="#000" stroke="none" dataKey="stage" />
              <LabelList position="center" fill="#fff" stroke="none" dataKey="value" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {reservationFunnelData.map((stage, index) => {
            const conversionRate = index > 0
              ? ((stage.value / reservationFunnelData[index - 1].value) * 100).toFixed(1)
              : '100';
            return (
              <div key={index} className="text-center p-3 bg-slate-50 rounded-xl">
                <div className="text-xs text-slate-500 mb-1">{stage.stage}</div>
                <div className="text-xl font-bold text-slate-900">{stage.value}</div>
                <div className="text-xs text-amber-600 font-medium">{conversionRate}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};