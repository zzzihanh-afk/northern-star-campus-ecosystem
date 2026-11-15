'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  QrCode,
  Wrench,
  CheckCircle,
  Plus,
  Clock,
  ArrowRight,
  UserCheck,
  AlertTriangle,
  Building,
  CheckCircle2,
  X,
  Phone,
} from 'lucide-react';

interface VisitorRecord {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  person: string;
  time: string;
  status: 'inside' | 'checked_out';
  qr: string;
}

interface WorkOrder {
  id: string;
  title: string;
  location: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Scheduled' | 'Completed';
  date: string;
}

export const OperationsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visitors' | 'maintenance' | 'security'>('visitors');

  const [visitors, setVisitors] = useState<VisitorRecord[]>([
    {
      id: '1',
      name: 'Kabir Chowdhury',
      phone: '+880 1711-889900',
      purpose: 'Admissions Inquiry (HSC Science)',
      person: 'Vice Principal',
      time: '10:30 AM',
      status: 'inside',
      qr: 'VIS-9901',
    },
    {
      id: '2',
      name: 'Monirul Islam',
      phone: '+880 1712-445566',
      purpose: 'IT Network Infrastructure Maintenance',
      person: 'System Administrator',
      time: '09:15 AM',
      status: 'checked_out',
      qr: 'VIS-9902',
    },
    {
      id: '3',
      name: 'Shamim Osman',
      phone: '+880 1715-332211',
      purpose: 'Parent Conference with Class Teacher',
      person: 'Class 9-A Coordinator',
      time: '11:45 AM',
      status: 'inside',
      qr: 'VIS-9903',
    },
  ]);

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    {
      id: 'wo-1',
      title: 'Central AC Servicing & Filter Replacement',
      location: 'Computer Lab 2 & Server Room',
      assignedTo: 'Dhaka Cool Works Ltd.',
      priority: 'High',
      status: 'In Progress',
      date: '2025-11-15',
    },
    {
      id: 'wo-2',
      title: 'Campus Solar Grid Inverter Periodic Audit',
      location: 'Rooftop Solar Array Wing-B',
      assignedTo: 'Campus Engineering Team',
      priority: 'Medium',
      status: 'Scheduled',
      date: '2025-11-17',
    },
    {
      id: 'wo-3',
      title: 'Chemistry Lab Gas Safety Valves Inspection',
      location: 'Science Building Room 305',
      assignedTo: 'Safety & Hazard Inspection Bureau',
      priority: 'High',
      status: 'Completed',
      date: '2025-11-14',
    },
    {
      id: 'wo-4',
      title: 'Basketball Court Floodlight Wiring Check',
      location: 'Outdoor Sports Arena',
      assignedTo: 'Campus Electrician (Rafiq)',
      priority: 'Low',
      status: 'Scheduled',
      date: '2025-11-18',
    },
  ]);

  const [newVisitorName, setNewVisitorName] = useState('');
  const [newVisitorPhone, setNewVisitorPhone] = useState('');
  const [newVisitorPurpose, setNewVisitorPurpose] = useState('');
  const [newVisitorPerson, setNewVisitorPerson] = useState('Principal / Vice Principal');
  const [showVisitorModal, setShowVisitorModal] = useState(false);

  const [showWorkOrderModal, setShowWorkOrderModal] = useState(false);
  const [woTitle, setWoTitle] = useState('');
  const [woLocation, setWoLocation] = useState('');
  const [woAssigned, setWoAssigned] = useState('');
  const [woPriority, setWoPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const handleCheckInVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitorName.trim()) return;
    const newV: VisitorRecord = {
      id: String(Date.now()),
      name: newVisitorName,
      phone: newVisitorPhone || '+880 1700-000000',
      purpose: newVisitorPurpose || 'Official Meeting',
      person: newVisitorPerson || 'Super Admin',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'inside',
      qr: `VIS-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setVisitors([newV, ...visitors]);
    setShowVisitorModal(false);
    setNewVisitorName('');
    setNewVisitorPhone('');
    setNewVisitorPurpose('');
  };

  const handleToggleVisitorStatus = (id: string) => {
    setVisitors(
      visitors.map((v) =>
        v.id === id
          ? { ...v, status: v.status === 'inside' ? ('checked_out' as const) : ('inside' as const) }
          : v
      )
    );
  };

  const handleAddWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!woTitle.trim()) return;
    const newWo: WorkOrder = {
      id: `wo-${Date.now()}`,
      title: woTitle,
      location: woLocation || 'Main Campus Wing',
      assignedTo: woAssigned || 'Campus Maintenance Team',
      priority: woPriority,
      status: 'Scheduled',
      date: new Date().toISOString().split('T')[0],
    };
    setWorkOrders([newWo, ...workOrders]);
    setShowWorkOrderModal(false);
    setWoTitle('');
    setWoLocation('');
    setWoAssigned('');
  };

  const insideCount = visitors.filter((v) => v.status === 'inside').length;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl border border-teal-100">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
              Smart Campus Operations & Gate Security
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Encrypted QR visitor passes, daily gate security logs, campus facility work orders & infrastructure maintenance.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowWorkOrderModal(true)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all"
          >
            <Wrench className="w-4 h-4" />
            <span>New Work Order</span>
          </button>
          <button
            onClick={() => setShowVisitorModal(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Register Visitor</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Visitors Inside</span>
            <span className="text-lg font-black text-blue-600">{insideCount} On Campus</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Gate Passes Today</span>
            <span className="text-lg font-black text-emerald-600">34 Passes</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Active Work Orders</span>
            <span className="text-lg font-black text-amber-600">{workOrders.length} Orders</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Campus Gates</span>
            <span className="text-lg font-black text-teal-600">All Secure</span>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card flex space-x-2">
        <button
          onClick={() => setActiveTab('visitors')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'visitors'
              ? 'bg-[#0B1E38] text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Gate Passes & Visitor Logs ({visitors.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('maintenance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'maintenance'
              ? 'bg-[#0B1E38] text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Facility Work Orders ({workOrders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'security'
              ? 'bg-[#0B1E38] text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Emergency & Surveillance</span>
        </button>
      </div>

      {/* 4. TAB 1: GATE VISITOR SECURITY */}
      {activeTab === 'visitors' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Encrypted Visitor Pass Check-ins</h3>
              <p className="text-xs text-slate-400">
                Authorized entry passes issued at main campus security checkpoints.
              </p>
            </div>
            <button
              onClick={() => setShowVisitorModal(true)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Issue New Pass</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Pass QR</th>
                  <th className="py-2.5 px-3">Visitor Name</th>
                  <th className="py-2.5 px-3">Phone</th>
                  <th className="py-2.5 px-3">Purpose</th>
                  <th className="py-2.5 px-3">Person to Meet</th>
                  <th className="py-2.5 px-3">Check-in</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visitors.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-600">{v.qr}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{v.name}</td>
                    <td className="py-2.5 px-3 text-slate-600 font-mono">{v.phone}</td>
                    <td className="py-2.5 px-3 text-slate-800">{v.purpose}</td>
                    <td className="py-2.5 px-3 text-slate-800 font-medium">{v.person}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{v.time}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          v.status === 'inside'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        {v.status === 'inside' ? 'Inside Campus' : 'Checked Out'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleToggleVisitorStatus(v.id)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          v.status === 'inside'
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {v.status === 'inside' ? 'Check Out' : 'Check In'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TAB 2: FACILITY WORK ORDERS */}
      {activeTab === 'maintenance' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Campus Facilities & Maintenance Work Orders</h3>
              <p className="text-xs text-slate-400">
                Track electrical, plumbing, HVAC, civil infrastructure & lab safety tickets.
              </p>
            </div>
            <button
              onClick={() => setShowWorkOrderModal(true)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Work Order</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workOrders.map((wo) => (
              <div
                key={wo.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400">{wo.id.toUpperCase()}</span>
                    <h4 className="text-xs font-bold text-slate-900">{wo.title}</h4>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      wo.priority === 'High'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : wo.priority === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {wo.priority} Priority
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1 pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <strong className="text-slate-800">{wo.location}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned To:</span>
                    <span className="text-slate-700">{wo.assignedTo}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-slate-400">Target: {wo.date}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      wo.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : wo.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800 animate-pulse'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {wo.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. TAB 3: EMERGENCY & SURVEILLANCE */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">Campus Security & Gate Guard Roster</h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 block">Gate #01 (Main Entrance)</strong>
                  <span className="text-[11px] text-slate-400">Shift Officer: Sgt. Nurul Islam</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full border border-emerald-200">
                  Active Duty
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 block">Gate #02 (Bus & Transit Gate)</strong>
                  <span className="text-[11px] text-slate-400">Shift Officer: Md. Mizanur Rahman</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full border border-emerald-200">
                  Active Duty
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 block">Central CCTV Control Room</strong>
                  <span className="text-[11px] text-slate-400">Supervisor: Monir Ahmed (64 Cameras Active)</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full border border-emerald-200">
                  100% Online
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Phone className="w-5 h-5 text-rose-600" />
              <h3 className="text-sm font-bold text-slate-900">Emergency & Incident Contacts</h3>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-rose-50/60 rounded-xl flex justify-between items-center border border-rose-100">
                <div>
                  <strong className="text-rose-950 block">Campus Security Hotline</strong>
                  <span className="text-[11px] text-rose-700">Internal Gate Intercom Ext. 101</span>
                </div>
                <a href="tel:+8801800000101" className="text-xs font-mono font-bold text-rose-700">
                  +880 1800-000101
                </a>
              </div>
              <div className="p-3 bg-blue-50/60 rounded-xl flex justify-between items-center border border-blue-100">
                <div>
                  <strong className="text-blue-950 block">Medical Infirmary & First Aid</strong>
                  <span className="text-[11px] text-blue-700">Campus Nurse / Medical Officer</span>
                </div>
                <a href="tel:+8801800000102" className="text-xs font-mono font-bold text-blue-700">
                  +880 1800-000102
                </a>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-xl flex justify-between items-center border border-amber-100">
                <div>
                  <strong className="text-amber-950 block">Electrical & Fire Safety Officer</strong>
                  <span className="text-[11px] text-amber-700">Safety Compliance Team</span>
                </div>
                <a href="tel:+8801800000103" className="text-xs font-mono font-bold text-amber-700">
                  +880 1800-000103
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visitor Modal */}
      {showVisitorModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">Issue Visitor Gate Pass</h3>
              <button onClick={() => setShowVisitorModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">Record security check-in at main campus gate.</p>

            <form onSubmit={handleCheckInVisitor} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Visitor Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariqul Islam"
                  value={newVisitorName}
                  onChange={(e) => setNewVisitorName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+880 17XX-XXXXXX"
                  value={newVisitorPhone}
                  onChange={(e) => setNewVisitorPhone(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Purpose of Visit</label>
                <input
                  type="text"
                  placeholder="e.g. Admission Inquiry"
                  value={newVisitorPurpose}
                  onChange={(e) => setNewVisitorPurpose(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Person to Meet</label>
                <input
                  type="text"
                  placeholder="e.g. Principal / Coordinator"
                  value={newVisitorPerson}
                  onChange={(e) => setNewVisitorPerson(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowVisitorModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
                >
                  Issue Pass & Check In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Work Order Modal */}
      {showWorkOrderModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">Create Facility Work Order</h3>
              <button
                onClick={() => setShowWorkOrderModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">Request campus infrastructure maintenance or repairs.</p>

            <form onSubmit={handleAddWorkOrder} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issue / Task Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Lab Water Purifier Filter"
                  value={woTitle}
                  onChange={(e) => setWoTitle(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Campus Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Room 304 / Science Block"
                  value={woLocation}
                  onChange={(e) => setWoLocation(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Contractor / Staff</label>
                <input
                  type="text"
                  placeholder="e.g. Campus Engineering Team"
                  value={woAssigned}
                  onChange={(e) => setWoAssigned(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Priority Level</label>
                <select
                  value={woPriority}
                  onChange={(e) => setWoPriority(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowWorkOrderModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
                >
                  Create Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
