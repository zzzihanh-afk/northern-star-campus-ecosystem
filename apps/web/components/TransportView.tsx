'use client';

import React, { useState } from 'react';
import {
  Bus,
  Search,
  Plus,
  Navigation,
  Clock,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Users,
  MapPin,
  Calendar,
  X,
} from 'lucide-react';

interface FleetVehicle {
  id: string;
  vehicleNumber: string;
  type: string;
  capacity: number;
  driverName: string;
  driverPhone: string;
  route: string;
  status: 'arrived' | 'on_route' | 'standby' | 'maintenance';
}

interface TransitRoute {
  id: string;
  code: string;
  name: string;
  stops: string[];
  assignedBus: string;
  pickupTime: string;
  dropTime: string;
  studentsCount: number;
  status: 'active' | 'scheduled';
}

export const TransportView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'routes'>('fleet');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

  // Fleet list
  const [fleet, setFleet] = useState<FleetVehicle[]>([
    {
      id: 'v-1',
      vehicleNumber: 'Bus #01',
      type: 'Standard School Bus',
      capacity: 50,
      driverName: 'Abdul Karim',
      driverPhone: '+880 1711-223345',
      route: 'Route A (Uttara Sector 3, 7, 11)',
      status: 'on_route',
    },
    {
      id: 'v-2',
      vehicleNumber: 'Bus #02',
      type: 'Standard School Bus',
      capacity: 50,
      driverName: 'Jahangir Alam',
      driverPhone: '+880 1711-223346',
      route: 'Route B (Mirpur 10, 11, Kazipara)',
      status: 'on_route',
    },
    {
      id: 'v-3',
      vehicleNumber: 'Bus #03',
      type: 'AC Campus Shuttle',
      capacity: 40,
      driverName: 'Md. Moklesur Rahman',
      driverPhone: '+880 1711-223344',
      route: 'Route C (Uttara Express & Sector 14)',
      status: 'arrived',
    },
    {
      id: 'v-4',
      vehicleNumber: 'Bus #04',
      type: 'Executive Coaster',
      capacity: 32,
      driverName: 'Rafiqul Islam',
      driverPhone: '+880 1711-223347',
      route: 'Route D (Banani, Gulshan & Mohakhali)',
      status: 'standby',
    },
    {
      id: 'v-5',
      vehicleNumber: 'Bus #05',
      type: 'Primary Section Shuttle',
      capacity: 25,
      driverName: 'Delowar Hossain',
      driverPhone: '+880 1711-223348',
      route: 'Route E (Campus Local Perimeter)',
      status: 'maintenance',
    },
  ]);

  // Routes list
  const routes: TransitRoute[] = [
    {
      id: 'rt-1',
      code: 'RT-01',
      name: 'Uttara North & West Route',
      stops: ['Sector 3', 'Sector 5 Square', 'Sector 9 Park', 'Campus Main Gate'],
      assignedBus: 'Bus #01',
      pickupTime: '06:50 AM',
      dropTime: '02:30 PM',
      studentsCount: 48,
      status: 'active',
    },
    {
      id: 'rt-2',
      code: 'RT-02',
      name: 'Mirpur & Rokeya Sarani Loop',
      stops: ['Mirpur 10', 'Shewrapara', 'Kazipara', 'Airport Road', 'Campus'],
      assignedBus: 'Bus #02',
      pickupTime: '06:40 AM',
      dropTime: '02:40 PM',
      studentsCount: 45,
      status: 'active',
    },
    {
      id: 'rt-3',
      code: 'RT-03',
      name: 'Uttara Sector 14 Express',
      stops: ['Kamarpara', 'Sector 10', 'Sector 14', 'Campus Main Gate'],
      assignedBus: 'Bus #03',
      pickupTime: '07:10 AM',
      dropTime: '02:15 PM',
      studentsCount: 38,
      status: 'active',
    },
    {
      id: 'rt-4',
      code: 'RT-04',
      name: 'Mohakhali & Gulshan Link',
      stops: ['Mohakhali DOHS', 'Gulshan-2', 'Kakoli', 'Campus'],
      assignedBus: 'Bus #04',
      pickupTime: '06:30 AM',
      dropTime: '03:00 PM',
      studentsCount: 30,
      status: 'scheduled',
    },
  ];

  // Add vehicle form state
  const [newVehicleNumber, setNewVehicleNumber] = useState('');
  const [newVehicleType, setNewVehicleType] = useState('Standard School Bus');
  const [newCapacity, setNewCapacity] = useState(45);
  const [newDriverName, setNewDriverName] = useState('');
  const [newDriverPhone, setNewDriverPhone] = useState('');
  const [newRoute, setNewRoute] = useState('Route A (Sector 3, 7, 11)');

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicleNumber.trim()) return;

    const newV: FleetVehicle = {
      id: `v-${Date.now()}`,
      vehicleNumber: newVehicleNumber,
      type: newVehicleType,
      capacity: Number(newCapacity) || 45,
      driverName: newDriverName || 'Assigned Driver',
      driverPhone: newDriverPhone || '+880 1700-000000',
      route: newRoute,
      status: 'standby',
    };

    setFleet([...fleet, newV]);
    setShowAddVehicleModal(false);
    setNewVehicleNumber('');
    setNewDriverName('');
    setNewDriverPhone('');
  };

  const filteredFleet = fleet.filter(
    (v) =>
      v.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
            <Bus className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
              Campus Transport Fleet & Route Logistics
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Live bus fleet tracking, route coverage zones, driver communications and student transit rosters.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddVehicleModal(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Registered Fleet</span>
            <span className="text-lg font-black text-slate-900">{fleet.length} Buses</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Active Routes</span>
            <span className="text-lg font-black text-emerald-600">8 Transit Zones</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Daily Commuters</span>
            <span className="text-lg font-black text-purple-600">420 Students</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">On-Time Performance</span>
            <span className="text-lg font-black text-teal-600">99.2%</span>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'fleet'
                ? 'bg-[#0B1E38] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Active Fleet ({filteredFleet.length})
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'routes'
                ? 'bg-[#0B1E38] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Route Schedules & Stops ({routes.length})
          </button>
        </div>

        <div className="relative sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search bus #, driver, route..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 4. TAB 1: ACTIVE FLEET CARDS */}
      {activeTab === 'fleet' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFleet.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{v.vehicleNumber}</h3>
                    <p className="text-[11px] text-slate-400">{v.type}</p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    v.status === 'arrived'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : v.status === 'on_route'
                      ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse'
                      : v.status === 'maintenance'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {v.status === 'arrived'
                    ? 'Arrived at Gate'
                    : v.status === 'on_route'
                    ? 'On Route'
                    : v.status === 'maintenance'
                    ? 'Maintenance'
                    : 'Standby'}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                <div className="flex items-center text-slate-600">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
                  <span className="font-semibold truncate">{v.route}</span>
                </div>
                <div className="flex items-center text-slate-500 text-[11px]">
                  <Users className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
                  <span>Seating Capacity: <strong>{v.capacity} Passengers</strong></span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Assigned Driver</span>
                  <strong className="text-slate-800">{v.driverName}</strong>
                </div>
                <a
                  href={`tel:${v.driverPhone}`}
                  className="p-2 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl text-slate-600 transition-all flex items-center space-x-1"
                  title="Call Driver"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono">{v.driverPhone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. TAB 2: ROUTE SCHEDULES & STOPS */}
      {activeTab === 'routes' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Official Campus Transit Schedules</h3>
              <p className="text-xs text-slate-400">
                Morning pickup rosters, transit waypoints, and evening student dropoffs.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Route Code</th>
                  <th className="py-2.5 px-3">Route Coverage</th>
                  <th className="py-2.5 px-3">Assigned Bus</th>
                  <th className="py-2.5 px-3">Morning Pickup</th>
                  <th className="py-2.5 px-3">Afternoon Drop</th>
                  <th className="py-2.5 px-3">Commuters</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {routes.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-600">{r.code}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900 block">{r.name}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {r.stops.map((stop, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                          >
                            {stop}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{r.assignedBus}</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-600 font-semibold">{r.pickupTime}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{r.dropTime}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-800">{r.studentsCount} Students</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {r.status === 'active' ? 'Active Daily' : 'Scheduled'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add Vehicle */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Add Vehicle to Fleet</h3>
              <button
                onClick={() => setShowAddVehicleModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddVehicle} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle / Bus Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bus #06"
                  value={newVehicleNumber}
                  onChange={(e) => setNewVehicleNumber(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Type</label>
                  <select
                    value={newVehicleType}
                    onChange={(e) => setNewVehicleType(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Standard School Bus">Standard Bus</option>
                    <option value="AC Campus Shuttle">AC Shuttle</option>
                    <option value="Executive Coaster">Coaster</option>
                    <option value="Junior Van">Van</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Seat Capacity</label>
                  <input
                    type="number"
                    min="10"
                    max="80"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Driver Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kamal Uddin"
                  value={newDriverName}
                  onChange={(e) => setNewDriverName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Driver Phone</label>
                <input
                  type="text"
                  required
                  placeholder="+880 17XX-XXXXXX"
                  value={newDriverPhone}
                  onChange={(e) => setNewDriverPhone(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Route</label>
                <input
                  type="text"
                  value={newRoute}
                  onChange={(e) => setNewRoute(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
