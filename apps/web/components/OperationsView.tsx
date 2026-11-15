'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  BookOpen,
  Bus,
  Users,
  QrCode,
  Package,
  Wrench,
  CheckCircle,
  Plus,
  Clock,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

export const OperationsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'library' | 'transport' | 'visitors' | 'assets'>('library');
  const [visitors, setVisitors] = useState([
    { id: '1', name: 'Kabir Chowdhury', phone: '+880 1711-889900', purpose: 'Admissions Inquiry', person: 'Vice Principal', time: '10:30 AM', status: 'inside', qr: 'VIS-9901' },
    { id: '2', name: 'Monirul Islam', phone: '+880 1712-445566', purpose: 'IT Infrastructure Maintenance', person: 'System Admin', time: '09:15 AM', status: 'checked_out', qr: 'VIS-9902' },
  ]);

  const [newVisitorName, setNewVisitorName] = useState('');
  const [newVisitorPhone, setNewVisitorPhone] = useState('');
  const [newVisitorPurpose, setNewVisitorPurpose] = useState('');
  const [showVisitorModal, setShowVisitorModal] = useState(false);

  const handleCheckInVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitorName.trim()) return;
    const newV = {
      id: String(Date.now()),
      name: newVisitorName,
      phone: newVisitorPhone || '+880 1700-000000',
      purpose: newVisitorPurpose || 'Official Meeting',
      person: 'Super Admin',
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
            Smart Campus Operations & Logistics
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Integrated fleet logistics, digital library catalogue, visitor gate QR check-ins and asset maintenance.
          </p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'library' ? 'bg-[#0B1E38] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            Digital Library
          </button>
          <button
            onClick={() => setActiveTab('transport')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'transport' ? 'bg-[#0B1E38] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            Transport Fleet (12)
          </button>
          <button
            onClick={() => setActiveTab('visitors')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'visitors' ? 'bg-[#0B1E38] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            Gate Visitor Security
          </button>
        </div>
      </div>

      {/* TAB 1: LIBRARY */}
      {activeTab === 'library' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Curriculum & Reference Library Catalogue</h3>
              <p className="text-xs text-slate-400">Total Books: 1,850 • Currently Borrowed: 142</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Science Today', author: 'Dr. Farhad Hossain', category: 'Educational', isbn: '978-0123456789', available: 5, total: 5, cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=150' },
              { title: 'Mathematics Guide', author: 'Prof. Nazmul Haque', category: 'Educational', isbn: '978-0987654321', available: 8, total: 10, cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=150' },
              { title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Language', isbn: '978-1108457651', available: 4, total: 6, cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=150' },
            ].map((book, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-3">
                <div className="w-16 h-20 relative rounded-lg overflow-hidden bg-white shadow-sm shrink-0">
                  <Image src={book.cover} alt={book.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">{book.category}</span>
                  <h4 className="text-xs font-bold text-slate-900 truncate">{book.title}</h4>
                  <p className="text-[11px] text-slate-500">{book.author}</p>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">{book.isbn}</p>
                  <div className="mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                    {book.available} / {book.total} Copies Available
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: TRANSPORT FLEET */}
      {activeTab === 'transport' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Campus Transport Fleet (12 Registered Buses)</h3>
              <p className="text-xs text-slate-400">All routes mapped with automated driver contacts & campus gate logging</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { bus: 'Bus #03', type: 'AC Campus Shuttle', capacity: 40, driver: 'Md. Moklesur Rahman', phone: '+880 1711-223344', status: 'Arrived at School Gate' },
              { bus: 'Bus #01', type: 'Standard School Bus', capacity: 50, driver: 'Abdul Karim', phone: '+880 1711-223345', status: 'On Route (Sector 11)' },
              { bus: 'Bus #02', type: 'Standard School Bus', capacity: 50, driver: 'Jahangir Alam', phone: '+880 1711-223346', status: 'On Route (Mirpur)' },
            ].map((v, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-slate-900">{v.bus}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {v.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{v.type} • Capacity: {v.capacity} Seats</p>
                <div className="pt-2 border-t border-slate-200/60 text-xs">
                  <span className="text-slate-400">Driver:</span> <strong className="text-slate-800">{v.driver}</strong>
                  <p className="text-slate-500 font-mono text-[11px]">{v.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GATE VISITOR SECURITY */}
      {activeTab === 'visitors' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Campus Visitor Gate Pass Logs</h3>
              <p className="text-xs text-slate-400">Encrypted QR code passes for authorized visitors</p>
            </div>
            <button
              onClick={() => setShowVisitorModal(true)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Visitor</span>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visitors.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-600">{v.qr}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{v.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{v.phone}</td>
                    <td className="py-2.5 px-3 text-slate-800">{v.purpose}</td>
                    <td className="py-2.5 px-3 text-slate-800">{v.person}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{v.time}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          v.status === 'inside'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {v.status === 'inside' ? 'Inside Campus' : 'Checked Out'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Visitor Modal */}
      {showVisitorModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Issue Visitor Gate Pass</h3>
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
    </div>
  );
};
