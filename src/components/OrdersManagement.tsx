import React, { useState } from 'react';
import { ClipboardList, Search, Download, CheckCircle, Clock, AlertCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const OrdersManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Total Orders', value: '8', icon: ClipboardList },
    { label: 'Pending', value: '2', icon: Clock },
    { label: 'In Progress', value: '3', icon: AlertCircle },
    { label: 'Completed', value: '2', icon: CheckCircle },
  ];

  const orderCompletionData = {
    completed: 245,
    inProgress: 78,
    pending: 19,
    cancelled: 12,
    total: 354,
  };

  const completionRate = ((orderCompletionData.completed / orderCompletionData.total) * 100).toFixed(1);
  const onTimeRate = 92.5;
  const avgCompletionDays = 7.5;

  const pieData = [
    { name: 'Completed', value: orderCompletionData.completed, color: '#10b981' },
    { name: 'In Progress', value: orderCompletionData.inProgress, color: '#3b82f6' },
    { name: 'Pending', value: orderCompletionData.pending, color: '#f59e0b' },
    { name: 'Cancelled', value: orderCompletionData.cancelled, color: '#ef4444' },
  ];

  const orders = [
    { id: 'ORD-001', customer: 'John Smith', orderDate: '2026-03-20', product: 'Premium Silk Suit', quantity: 1, amount: '$1,200', status: 'In Progress', priority: 'High', deliveryDate: '2026-03-05' },
    { id: 'ORD-002', customer: 'Maria Garcia', orderDate: '2026-03-22', product: 'Woolen Blazer', quantity: 2, amount: '$800', status: 'Pending', priority: 'Medium', deliveryDate: '2026-03-10' },
    { id: 'ORD-003', customer: 'David Lee', orderDate: '2026-03-18', product: 'Cotton Shirt', quantity: 3, amount: '$450', status: 'In Progress', priority: 'Medium', deliveryDate: '2026-03-08' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Completed': 'bg-green-100 text-green-700',
      'In Progress': 'bg-amber-100 text-amber-700',
      'Pending': 'bg-blue-100 text-blue-700',
      'Cancelled': 'bg-red-100 text-red-700',
    };
    return colors[status] || '';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'High': 'text-red-600',
      'Medium': 'text-amber-600',
      'Low': 'text-slate-600',
    };
    return colors[priority] || '';
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Orders Management</h2>
          <p className="text-slate-500">Track and manage all customer orders in one place.</p>
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
          + New Order
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = ['bg-blue-50 border-blue-200', 'bg-amber-50 border-amber-200', 'bg-orange-50 border-orange-200', 'bg-green-50 border-green-200'];
          const iconColors = ['text-blue-600', 'text-amber-600', 'text-orange-600', 'text-green-600'];
          return (
            <div key={index} className={`${colors[index]} rounded-2xl p-6 shadow-sm border-2`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white">
                  <Icon className={`w-6 h-6 ${iconColors[index]}`} />
                </div>
                <p className="text-sm font-bold text-slate-700">{stat.label}</p>
              </div>
              <h3 className="text-4xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Order Completion Rate</h3>
          <p className="text-sm text-slate-500">Overall performance metrics and completion statistics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <div className="relative">
              <ResponsiveContainer width={300} height={300}>
                <PieChart>
                  <Pie data={pieData} cx={150} cy={150} innerRadius={90} outerRadius={130} paddingAngle={2} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-5xl font-bold text-slate-900">{completionRate}%</div>
                <div className="text-sm text-slate-500 mt-1">Completion Rate</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-500 p-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-700 font-medium">Completed Orders</p>
                  <p className="text-3xl font-bold text-green-900">{orderCompletionData.completed}</p>
                </div>
              </div>
              <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 transition-all" style={{ width: `${(orderCompletionData.completed / orderCompletionData.total) * 100}%` }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-500 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-medium">On-Time Delivery Rate</p>
                  <p className="text-3xl font-bold text-blue-900">{onTimeRate}%</p>
                </div>
              </div>
              <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all" style={{ width: `${onTimeRate}%` }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border-2 border-amber-200">
              <div className="flex items-center gap-4">
                <div className="bg-amber-500 p-3 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <p className="text-sm text-amber-700 font-medium">Avg Completion Time</p>
                  <p className="text-3xl font-bold text-amber-900">{avgCompletionDays} days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {pieData.map((item, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-slate-600">{item.name}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{item.value}</div>
              <div className="text-xs text-slate-500">{((item.value / orderCompletionData.total) * 100).toFixed(1)}% of total</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by order ID, customer name, or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none">
                <option>All Status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
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
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Qty</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Delivery</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4"><span className="font-bold text-slate-900">{order.id}</span></td>
                  <td className="px-6 py-4">
                    <span className="text-slate-900">{order.customer}</span>
                    <div className="text-xs text-slate-500">Order: {order.orderDate}</div>
                  </td>
                  <td className="px-6 py-4"><span className="text-slate-900">{order.product}</span></td>
                  <td className="px-6 py-4"><span className="text-slate-900">{order.quantity}</span></td>
                  <td className="px-6 py-4"><span className="font-bold text-slate-900">{order.amount}</span></td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(order.status)}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${getPriorityColor(order.priority)}`}>{order.priority}</span>
                  </td>
                  <td className="px-6 py-4"><span className="text-slate-900">{order.deliveryDate}</span></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4 text-slate-600" /></button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4 text-slate-600" /></button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
