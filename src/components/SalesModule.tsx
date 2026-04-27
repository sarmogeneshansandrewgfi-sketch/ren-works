import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Order {
  id: string;
  customer: {
    name: string;
    initial: string;
  };
  items: string;
  amount: number;
  date: string;
  status: string;
}

interface FrequencyData {
  segment: string;
  purchases: number;
  color: string;
}

export const SalesModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState({
    todaysSales: 0,
    pendingOrders: 0,
    monthlyCurrent: 0,
    monthlyTotal: 18000,
    targetPercentage: 0,
    purchaseFrequencyData: [] as FrequencyData[],
    orders: [] as Order[]
  });

  // Fetch data from API
  const fetchSalesData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/ren-ren-api/api/get_sales.php');
      const result = await response.json();
      
      console.log('Sales Data:', result);
      
      if (result.success) {
        setSalesData({
          todaysSales: result.todaysSales || 0,
          pendingOrders: result.pendingOrders || 0,
          monthlyCurrent: result.monthlyCurrent || 0,
          monthlyTotal: result.monthlyTotal || 18000,
          targetPercentage: result.targetPercentage || 0,
          purchaseFrequencyData: result.purchaseFrequencyData || [],
          orders: result.orders || []
        });
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  const formatCurrency = (value: number) => {
    return `₱${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'completed') return 'bg-green-100 text-green-700';
    if (statusLower === 'pending') return 'bg-amber-100 text-amber-700';
    if (statusLower === 'in progress') return 'bg-blue-100 text-blue-700';
    return 'bg-slate-100 text-slate-700';
  };

  const filteredOrders = salesData.orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-500">Loading sales data from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Sales & Orders</h2>
          <p className="text-slate-500">Track orders and manage customer transactions.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchSalesData}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
            + Record Sale
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
          <p className="text-sm font-bold text-green-700 uppercase tracking-wide mb-2">Today's Sales</p>
          <h3 className="text-4xl font-bold text-green-900">{formatCurrency(salesData.todaysSales)}</h3>
          <p className="text-xs text-green-600 mt-2">from database</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border-2 border-amber-200">
          <p className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-2">Pending Orders</p>
          <h3 className="text-4xl font-bold text-amber-900">{salesData.pendingOrders}</h3>
          <p className="text-xs text-amber-600 mt-2">need attention</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
          <p className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">Monthly Target</p>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-4xl font-bold text-blue-900">{salesData.targetPercentage}%</h3>
            <span className="text-sm text-blue-600">
              ({formatCurrency(salesData.monthlyCurrent)} / {formatCurrency(salesData.monthlyTotal)})
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 rounded-full h-2 transition-all duration-500"
              style={{ width: `${Math.min(salesData.targetPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Purchase Frequency Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Purchase Frequency</h3>
          <p className="text-sm text-slate-500">Customer segments by number of purchases</p>
        </div>
        {salesData.purchaseFrequencyData.some(d => d.purchases > 0) ? (
          <>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salesData.purchaseFrequencyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="segment" type="category" stroke="#64748b" width={150} />
                <Tooltip
                  formatter={(value) => [`${value} customers`, 'Count']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
                <Bar dataKey="purchases" radius={[0, 8, 8, 0]}>
                  {salesData.purchaseFrequencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
              {salesData.purchaseFrequencyData.map((segment, index) => (
                <div key={index} className="text-center p-3 bg-slate-50 rounded-xl">
                  <div className="text-xs text-slate-500 mb-1">{segment.segment}</div>
                  <div className="text-xl font-bold text-slate-900">{segment.purchases}</div>
                  <div className="text-xs text-amber-600 font-medium">customers</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-slate-400">
            No purchase data available. Add some sales to see customer segments.
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Items</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{order.customer.initial}</span>
                        </div>
                        <span className="font-medium text-slate-900">{order.customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600">{order.items}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900">{formatCurrency(order.amount)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600">{order.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    No orders found in database. Add some sales to see them here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};