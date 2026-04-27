import React, { useState } from 'react';
import { Package, Search, Filter, Plus, MoreVertical } from 'lucide-react';

export const InventoryModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const inventoryItems = [
    { id: 1, icon: Package, name: 'Egyptian Cotton - White', category: 'Fabric', stockLevel: '45 Meters', minStock: '10 Meters', status: 'In Stock' },
    { id: 2, icon: Package, name: 'Silk Satin - Navy', category: 'Fabric', stockLevel: '8 Meters', minStock: '15 Meters', status: 'Low Stock' },
    { id: 3, icon: Package, name: 'Polyester Thread - Black', category: 'Supplies', stockLevel: '120 Rolls', minStock: '30 Rolls', status: 'In Stock' },
    { id: 4, icon: Package, name: 'Metal Zippers 20cm', category: 'Supplies', stockLevel: '0 Pieces', minStock: '40 Pieces', status: 'Out of Stock' },
    { id: 5, icon: Package, name: 'Linen Blend - Beige', category: 'Fabric', stockLevel: '22 Meters', minStock: '10 Meters', status: 'In Stock' },
  ];

  const inventoryTurnoverData = [
    { item: 'Premium Wool Fabric', sku: 'FAB-001', stock: 145, sold: 89, turnoverRate: 7.2, daysToSell: 50, status: 'excellent' },
    { item: 'Cotton Blend Fabric', sku: 'FAB-002', stock: 234, sold: 156, turnoverRate: 8.1, daysToSell: 45, status: 'excellent' },
    { item: 'Silk Lining Material', sku: 'LIN-001', stock: 87, sold: 52, turnoverRate: 5.4, daysToSell: 68, status: 'good' },
    { item: 'Polyester Thread', sku: 'THR-001', stock: 432, sold: 245, turnoverRate: 6.8, daysToSell: 54, status: 'good' },
    { item: 'Metal Buttons (Gold)', sku: 'BTN-001', stock: 156, sold: 67, turnoverRate: 4.2, daysToSell: 87, status: 'average' },
    { item: 'Plastic Buttons', sku: 'BTN-002', stock: 289, sold: 98, turnoverRate: 3.8, daysToSell: 96, status: 'average' },
    { item: 'Invisible Zippers', sku: 'ZIP-001', stock: 178, sold: 45, turnoverRate: 2.1, daysToSell: 174, status: 'poor' },
    { item: 'Decorative Trim', sku: 'TRM-001', stock: 234, sold: 34, turnoverRate: 1.6, daysToSell: 228, status: 'poor' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'In Stock': 'bg-green-100 text-green-700',
      'Low Stock': 'bg-amber-100 text-amber-700',
      'Out of Stock': 'bg-red-100 text-red-700',
    };
    return colors[status] || '';
  };

  const getTurnoverColor = (status: string) => {
    const colors: Record<string, string> = {
      excellent: 'bg-green-100 text-green-700 border-green-200',
      good: 'bg-blue-100 text-blue-700 border-blue-200',
      average: 'bg-amber-100 text-amber-700 border-amber-200',
      poor: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[status] || '';
  };

  const getTurnoverBadge = (status: string) => {
    const badges: Record<string, string> = { excellent: 'Excellent', good: 'Good', average: 'Average', poor: 'Poor' };
    return badges[status] || '';
  };

  const getProgressBarColor = (status: string) => {
    const colors: Record<string, string> = {
      excellent: 'bg-green-500',
      good: 'bg-blue-500',
      average: 'bg-amber-500',
      poor: 'bg-red-500',
    };
    return colors[status] || '';
  };

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Inventory Management</h2>
          <p className="text-slate-500">Manage your fabrics, supplies, and stock levels.</p>
        </div>
        <button className="px-6 py-3 bg-amber-500 text-white rounded-xl text-sm font-medium hover:bg-amber-600 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Stock
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Item Name</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Level</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100">
                          <Icon className="w-4 h-4 text-slate-600" />
                        </div>
                        <span className="font-medium text-slate-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-slate-600">{item.category}</span></td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-slate-900">{item.stockLevel}</div>
                        <div className="text-xs text-slate-500">Min: {item.minStock}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-slate-600" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Inventory Turnover</h3>
          <p className="text-sm text-slate-500">Track how quickly items are selling</p>
        </div>

        <div className="flex items-center gap-6 mb-6 p-4 bg-slate-50 rounded-xl flex-wrap">
          {[
            { color: 'bg-green-500', label: 'Excellent (7+ turnovers/year)' },
            { color: 'bg-blue-500', label: 'Good (5-7 turnovers/year)' },
            { color: 'bg-amber-500', label: 'Average (3-5 turnovers/year)' },
            { color: 'bg-red-500', label: 'Poor (<3 turnovers/year)' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-sm text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {inventoryTurnoverData.map((item, index) => (
            <div key={index} className={`p-5 rounded-xl border-2 transition-all hover:shadow-md ${getTurnoverColor(item.status)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-slate-900">{item.item}</h4>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getTurnoverColor(item.status)}`}>
                      {getTurnoverBadge(item.status)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{item.turnoverRate}</div>
                  <div className="text-xs text-slate-600">turnovers/year</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="text-xs text-slate-600 mb-1">Current Stock</div>
                  <div className="text-lg font-bold text-slate-900">{item.stock}</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="text-xs text-slate-600 mb-1">Units Sold</div>
                  <div className="text-lg font-bold text-slate-900">{item.sold}</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="text-xs text-slate-600 mb-1">Avg Days to Sell</div>
                  <div className="text-lg font-bold text-slate-900">{item.daysToSell}</div>
                </div>
              </div>

              <div className="relative h-2 bg-white/50 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressBarColor(item.status)} transition-all`}
                  style={{ width: `${Math.min((item.turnoverRate / 10) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
