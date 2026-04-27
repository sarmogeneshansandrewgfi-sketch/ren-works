import React from 'react';
import { TrendingUp, Users, Package, ShoppingCart, ArrowUp, ArrowDown, FileText, PlusCircle, BarChart2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardOverviewProps {
  onNavigate: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const stats = [
    { label: 'Total Revenue', value: '₱24,560', change: '+12.5%', trend: 'up', icon: TrendingUp },
    { label: 'Total Sales', value: '156', change: '+8.2%', trend: 'up', icon: ShoppingCart },
    { label: 'Inventory Items', value: '1,240', change: '-2.4%', trend: 'down', icon: Package },
    { label: 'Active Customers', value: '482', change: '+14.1%', trend: 'up', icon: Users },
  ];

  const revenueData = [
    { time: '00:00', value: 4000 },
    { time: '04:00', value: 3000 },
    { time: '08:00', value: 2000 },
    { time: '12:00', value: 2780 },
    { time: '16:00', value: 1890 },
    { time: '20:00', value: 2390 },
    { time: '24:00', value: 3490 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Workspace Overview</h2>
          <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Download Report
          </button>
          
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-50">
                  <Icon className="w-6 h-6 text-slate-600" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Revenue Analytics</h3>
            <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: '#f59e0b', r: 4 }}
                fill="url(#revenueGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('sales')}
              className="w-full p-4 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors flex items-center gap-3 group"
            >
              <div className="bg-amber-500 p-2.5 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-slate-900">New Sale</p>
                <p className="text-xs text-slate-500">Record a new transaction</p>
              </div>
              <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors rotate-90" />
            </button>

            <button
              onClick={() => onNavigate('inventory')}
              className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-3 group"
            >
              <div className="bg-slate-700 p-2.5 rounded-lg">
                <PlusCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-slate-900">Add Stock</p>
                <p className="text-xs text-slate-500">Update your inventory levels</p>
              </div>
              <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors rotate-90" />
            </button>

            <button
              onClick={() => onNavigate('orders')}
              className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-3 group"
            >
              <div className="bg-slate-700 p-2.5 rounded-lg">
                <BarChart2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-slate-900">View Reports</p>
                <p className="text-xs text-slate-500">Generate analytics reports</p>
              </div>
              <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
