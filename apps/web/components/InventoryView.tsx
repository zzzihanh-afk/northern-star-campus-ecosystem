'use client';

import React, { useState } from 'react';
import {
  Package,
  Search,
  Plus,
  Filter,
  CheckCircle,
  AlertTriangle,
  Wrench,
  Layers,
  Building,
  Monitor,
  Activity,
  X,
  Download,
} from 'lucide-react';

interface AssetItem {
  id: string;
  code: string;
  name: string;
  category: 'IT & Computing' | 'Science Labs' | 'Classroom Furniture' | 'Sports Gear' | 'Audio/Visual';
  location: string;
  quantity: number;
  inUse: number;
  condition: 'Operational' | 'Good' | 'Needs Service' | 'Critical Repair';
  lastAudit: string;
}

export const InventoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [inventory, setInventory] = useState<AssetItem[]>([
    {
      id: 'ast-1',
      code: 'AST-IT-101',
      name: 'Core i7 Desktop Computer Workstation',
      category: 'IT & Computing',
      location: 'Computer Lab 2 (2nd Floor)',
      quantity: 45,
      inUse: 45,
      condition: 'Operational',
      lastAudit: '2025-11-05',
    },
    {
      id: 'ast-2',
      code: 'AST-SCI-204',
      name: 'Bresser High-Precision Optical Microscope',
      category: 'Science Labs',
      location: 'Biology Laboratory (Room 302)',
      quantity: 24,
      inUse: 22,
      condition: 'Good',
      lastAudit: '2025-10-28',
    },
    {
      id: 'ast-3',
      code: 'AST-AV-012',
      name: 'Interactive Smart Board Display 75"',
      category: 'Audio/Visual',
      location: 'Multimedia Presentation Hall',
      quantity: 8,
      inUse: 8,
      condition: 'Operational',
      lastAudit: '2025-11-10',
    },
    {
      id: 'ast-4',
      code: 'AST-FURN-310',
      name: 'Ergonomic Dual Wooden Student Desks',
      category: 'Classroom Furniture',
      location: 'High School Wing (Rooms 401-410)',
      quantity: 450,
      inUse: 440,
      condition: 'Good',
      lastAudit: '2025-10-15',
    },
    {
      id: 'ast-5',
      code: 'AST-SPT-042',
      name: 'Tournament Cricket Match Kit & Gear Bags',
      category: 'Sports Gear',
      location: 'Campus Sports Complex',
      quantity: 12,
      inUse: 10,
      condition: 'Needs Service',
      lastAudit: '2025-11-02',
    },
    {
      id: 'ast-6',
      code: 'AST-IT-108',
      name: 'High-Speed Laser Jet Network Printer',
      category: 'IT & Computing',
      location: 'Teacher Administrative Office',
      quantity: 6,
      inUse: 5,
      condition: 'Needs Service',
      lastAudit: '2025-11-08',
    },
    {
      id: 'ast-7',
      code: 'AST-SCI-210',
      name: 'Digital Analytical Electronic Balance',
      category: 'Science Labs',
      location: 'Chemistry Laboratory (Room 305)',
      quantity: 16,
      inUse: 16,
      condition: 'Operational',
      lastAudit: '2025-11-01',
    },
  ]);

  // Add form fields
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<AssetItem['category']>('IT & Computing');
  const [newLocation, setNewLocation] = useState('');
  const [newQuantity, setNewQuantity] = useState(10);
  const [newCondition, setNewCondition] = useState<AssetItem['condition']>('Operational');

  const categories = [
    'All',
    'IT & Computing',
    'Science Labs',
    'Classroom Furniture',
    'Sports Gear',
    'Audio/Visual',
  ];

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newAsset: AssetItem = {
      id: `ast-${Date.now()}`,
      code: newCode || `AST-${newCategory.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      name: newName,
      category: newCategory,
      location: newLocation || 'Main Campus Depot',
      quantity: Number(newQuantity) || 1,
      inUse: Number(newQuantity) || 1,
      condition: newCondition,
      lastAudit: new Date().toISOString().split('T')[0],
    };

    setInventory([newAsset, ...inventory]);
    setShowAddModal(false);
    setNewCode('');
    setNewName('');
    setNewLocation('');
    setNewQuantity(10);
  };

  const filteredAssets = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
              Campus Inventory & Physical Asset Register
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Physical lab equipment, classroom smartboards, furniture, sports apparatus, and institutional supplies tracking.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Asset Item</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Total Catalogued</span>
            <span className="text-lg font-black text-slate-900">2,450 Units</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Operational Rate</span>
            <span className="text-lg font-black text-emerald-600">97.1% (2,380)</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Maintenance Required</span>
            <span className="text-lg font-black text-amber-600">14 Items</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Estimated Valuation</span>
            <span className="text-lg font-black text-purple-600">৳ 48.5 Lakhs</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0B1E38] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search asset, code, room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 4. Inventory Asset Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Physical Asset Inventory List</h3>
            <p className="text-xs text-slate-400">
              Showing {filteredAssets.length} verified campus assets across academic and administrative wings.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Asset Code</th>
                <th className="py-2.5 px-3">Item Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Location / Room</th>
                <th className="py-2.5 px-3">Quantity</th>
                <th className="py-2.5 px-3">Condition</th>
                <th className="py-2.5 px-3">Last Audited</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssets.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600">{item.code}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 font-medium">{item.location}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">
                    {item.inUse} in use / {item.quantity} total
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        item.condition === 'Operational'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : item.condition === 'Good'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {item.condition}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">{item.lastAudit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Asset */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Add Campus Asset Item</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddAsset} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Epson Multimedia Projector"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="IT & Computing">IT & Computing</option>
                    <option value="Science Labs">Science Labs</option>
                    <option value="Classroom Furniture">Furniture</option>
                    <option value="Sports Gear">Sports Gear</option>
                    <option value="Audio/Visual">Audio/Visual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location / Room</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Lab 2 (Room 304)"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Asset Code</label>
                  <input
                    type="text"
                    placeholder="Auto-generated if empty"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Condition</label>
                  <select
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Operational">Operational</option>
                    <option value="Good">Good</option>
                    <option value="Needs Service">Needs Service</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
