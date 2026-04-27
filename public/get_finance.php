import React, { useState } from 'react';
import { DollarSign, TrendingUp, Activity, ShoppingCart } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  FunnelChart, Funnel, LabelList
} from 'recharts';

export const FinanceMonitoringAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  // DIRECT DATA - NO API NEEDED
  const revenueData = [
    { month: 'Jan 2026', revenue: 12500, expenses: 8900, profit: 3600 },
    { month: 'Feb 2026', revenue: 14800, expenses: 9500, profit: 5300 },
    { month: 'Mar 2026', revenue: 16200, expenses: 10200, profit: 6000 },
    { month: 'Apr 2026', revenue: 19800, expenses: 11500, profit: 8300 },
  ];

  const expenseBreakdown = [
    { category: 'Materials', amount: 12500, percentage: 52.1, color: '#f59e0b' },
    { category: 'Labor', amount: 6800, percentage: 28.3, color: '#3b82f6' },
    { category: 'Rent & Utilities', amount: 3200, percentage: 13.3, color: '#10b981' },
    { category: 'Marketing', amount: 1200, percentage: 5.0, color: '#8b5cf6' },
    { category: 'Other', amount: 300, percentage: 1.3, color: '#6b7280' },
  ];

  const cashFlowData = [
    { week: 'Week 1', inflow: 4200, outflow: 3100 },
    { week: 'Week 2', inflow: 5800, outflow: 4200 },
    { week: 'Week 3', inflow: 6300, outflow: 4800 },
    { week: 'Week 4', inflow: 7100, outflow: 5200 },
  ];

  const salesTrendData = [
    { day: 'Mon Apr 14', sales: 1250 },
    { day: 'Tue Apr 15', sales: 1890 },
    { day: 'Wed Apr 16', sales: 2100 },
    { day: 'Thu Apr 17', sales: 2450 },
    { day: 'Fri Apr 18', sales: 3200 },
    { day: 'Sat Apr 19', sales: 2800 },
    { day: 'Sun Apr 20', sales: 1900 },
  ];

  const topSellingProducts = [
    { product_name: 'Egyptian Cotton Shirt', revenue: 12400 },
    { product_name: 'Custom Tuxedo', revenue: 8900 },
    { product_name: 'Linen Trousers', revenue: 5600 },
    { product_name: 'Round Neck Shirt', revenue: 3400 },
    { product_name: 'Wool Blazer', revenue: 2800 },
  ];

  const reservationFunnelData = [
    { stage: 'Website Visits', value: 2450, fill: '#f0f9ff' },
    { stage: 'Appointment Booked', value: 1680, fill: '#bae6fd' },
    { stage: 'Consultation Done', value: 1245, fill: '#7dd3fc' },
    { stage: 'Measurement Taken', value: 892, fill: '#38bdf8' },
    { stage: 'Order Placed', value: 634, fill: '#0ea5e9' }
  ];

  const kpis = { totalSales: 28380, grossMargin: 41.2, avgOrderValue: 856.7 };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PH', { 
      style: 'currency', 
      currency: 'PHP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Financial Analytics</h2>
          <p className="text-slate-500">Total Sales and payment records</p>
        </div>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl text-sm bg-white"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last 3 Months</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-white/20"><DollarSign className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium">Total Sales</p><p className="text-xs opacity-75">Revenue</p></div>
          </div>
          <h3 className="text-3xl font-bold">{formatCurrency(kpis.totalSales)}</h3>
          <p className="text-xs mt-2 opacity-75">↑ +12.5% from last month</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-white/20"><TrendingUp className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium">Gross Profit</p><p className="text-xs opacity-75">Margin</p></div>
          </div>
          <h3 className="text-3xl font-bold">{kpis.grossMargin}%</h3>
          <p className="text-xs mt-2 opacity-75">↑ +8.1% growth</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-white/20"><Activity className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium">Revenue Margin</p><p className="text-xs opacity-75">Growth</p></div>
          </div>
          <h3 className="text-3xl font-bold">+15.3%</h3>
          <p className="text-xs mt-2 opacity-75">Year over year</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-white/20"><ShoppingCart className="w-6 h-6" /></div>
            <div><p className="text-sm font-medium">Avg Order</p><p className="text-xs opacity-75">Value</p></div>
          </div>
          <h3 className="text-3xl font-bold">{formatCurrency(kpis.avgOrderValue)}</h3>
          <p className="text-xs mt-2 opacity-75">Per transaction</p>
        </div>
      </div>

      {/* Revenue & Expenses Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue & Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Revenue" />
              <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                label={({ category, percentage }) => `${category} ${percentage}%`}
                outerRadius={100}
                dataKey="amount"
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cash Flow */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Cash Flow Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis tickFormatter={(v) => formatCurrency(v)} />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Legend />
            <Bar dataKey="inflow" fill="#10b981" name="Cash Inflow" radius={[8, 8, 0, 0]} />
            <Bar dataKey="outflow" fill="#ef4444" name="Cash Outflow" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Trend & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Sales Trend Line Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="Daily Sales" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Top-selling Product Bar Graph</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSellingProducts} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} />
              <YAxis type="category" dataKey="product_name" width={120} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 8, 8, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reservation Funnel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Reservation Conversion</h3>
        <ResponsiveContainer width="100%" height={400}>
          <FunnelChart>
            <Tooltip />
            <Funnel dataKey="value" data={reservationFunnelData}>
              <LabelList position="right" fill="#1e293b" dataKey="stage" />
              <LabelList position="center" fill="#fff" dataKey="value" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-5 gap-4">
          {reservationFunnelData.map((stage, index) => (
            <div key={index} className="text-center p-3 bg-slate-50 rounded-xl">
              <div className="text-xs text-slate-500">{stage.stage}</div>
              <div className="text-xl font-bold">{stage.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};