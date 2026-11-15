'use client';

import React, { useState, useEffect } from 'react';
import {
  HeartHandshake,
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  Users,
  MapPin,
  Briefcase,
  CheckCircle2,
  X,
  Smartphone,
  ShieldCheck,
  Eye,
  EyeOff,
  Key,
  Copy,
  Check,
} from 'lucide-react';
import { Parent } from '@/lib/types';
import { dataService } from '@/lib/data-service';

export const ParentManagementView: React.FC = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRelation, setSelectedRelation] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState<'Father' | 'Mother' | 'Guardian'>('Father');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentCode, setNewStudentCode] = useState('');
  const [newStudentClass, setNewStudentClass] = useState('Class 9-A');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newOccupation, setNewOccupation] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPassword, setNewPassword] = useState('PRN@2025');
  const [showPassword, setShowPassword] = useState(false);
  const [credentialModalData, setCredentialModalData] = useState<{
    name: string;
    relation: string;
    studentName: string;
    studentCode: string;
    phone: string;
    password: string;
  } | null>(null);
  const [copiedCredential, setCopiedCredential] = useState(false);

  useEffect(() => {
    loadParents();
  }, []);

  const loadParents = async () => {
    const data = await dataService.getParents();
    setParents(data);
  };

  const relations = ['All', 'Father', 'Mother', 'Guardian'];

  const handleAddParent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newStudentName.trim()) return;

    const newParentItem: Parent = {
      id: `par-${Date.now()}`,
      full_name: newName,
      relation: newRelation,
      student_name: newStudentName,
      student_code: newStudentCode || `NSC202500${parents.length + 1}`,
      student_class: newStudentClass,
      phone: newPhone || '+880 1700-000000',
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      occupation: newOccupation || 'Business / Private Service',
      address: newAddress || 'Uttara, Dhaka',
      is_active: true,
    };

    setParents([newParentItem, ...parents]);
    setShowAddModal(false);
    setCredentialModalData({
      name: newName,
      relation: newRelation,
      studentName: newStudentName,
      studentCode: newParentItem.student_code,
      phone: newPhone || '+880 1700-000000',
      password: newPassword.trim() || newParentItem.student_code,
    });
    setNewName('');
    setNewStudentName('');
    setNewStudentCode('');
    setNewPhone('');
    setNewEmail('');
    setNewPassword('PRN@2025');
    setNewOccupation('');
    setNewAddress('');
  };

  const filteredParents = parents.filter((p) => {
    const parentMatch = p.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const studentMatch = p.student_name.toLowerCase().includes(searchTerm.toLowerCase());
    const codeMatch = p.student_code.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = p.phone.includes(searchTerm);
    const relationMatch = selectedRelation === 'All' || p.relation === selectedRelation;
    return (parentMatch || studentMatch || codeMatch || phoneMatch) && relationMatch;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100">
            <HeartHandshake className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
              Parents & Guardian Directory
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Student guardian registry, primary emergency contacts, occupation profiles, and mobile app authentication.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-blue-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Parent</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Registered Guardians</span>
            <span className="text-lg font-black text-slate-900">{parents.length} Active</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Linked Students</span>
            <span className="text-lg font-black text-blue-600">1,250 Enrolled</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Emergency Contacts</span>
            <span className="text-lg font-black text-emerald-600">99.4% Verified</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Mobile Portal</span>
            <span className="text-lg font-black text-amber-600">Enabled</span>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {relations.map((rel) => (
            <button
              key={rel}
              onClick={() => setSelectedRelation(rel)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRelation === rel
                  ? 'bg-[#0B1E38] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {rel}
            </button>
          ))}
        </div>

        <div className="relative sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search parent, student, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 4. Parent Directory Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Guardian Roster & Contact Registry</h3>
            <p className="text-xs text-slate-400">
              Showing {filteredParents.length} registered student guardians with authenticated communications channels.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Parent / Guardian</th>
                <th className="py-2.5 px-3">Relation</th>
                <th className="py-2.5 px-3">Linked Student</th>
                <th className="py-2.5 px-3">Phone & Emergency Contact</th>
                <th className="py-2.5 px-3">Occupation & Address</th>
                <th className="py-2.5 px-3">Mobile Portal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredParents.map((parent) => (
                <tr key={parent.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3">
                    <strong className="text-slate-900 block">{parent.full_name}</strong>
                    <span className="text-[11px] text-slate-400 font-mono">{parent.email}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        parent.relation === 'Father'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : parent.relation === 'Mother'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}
                    >
                      {parent.relation}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-800 block">{parent.student_name}</span>
                    <span className="text-[11px] font-mono text-blue-600 font-semibold">{parent.student_code}</span>
                    <span className="text-[11px] text-slate-400 block">{parent.student_class}</span>
                  </td>
                  <td className="py-3 px-3">
                    <a
                      href={`tel:${parent.phone}`}
                      className="text-slate-800 hover:text-blue-600 font-mono font-semibold text-xs flex items-center"
                    >
                      <Phone className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                      <span>{parent.phone}</span>
                    </a>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center text-slate-700 font-medium">
                      <Briefcase className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                      <span className="truncate">{parent.occupation}</span>
                    </div>
                    <div className="flex items-center text-slate-400 text-[11px] mt-0.5">
                      <MapPin className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                      <span className="truncate">{parent.address}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center w-fit space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Connected</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Add Parent Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">Add Parent / Guardian</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">Register a student's parent or legal guardian for records & portal access.</p>

            <form onSubmit={handleAddParent} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mr. Md. Mahbubur Rahman"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Relation</label>
                  <select
                    value={newRelation}
                    onChange={(e) => setNewRelation(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Legal Guardian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student Class & Sec</label>
                  <input
                    type="text"
                    value={newStudentClass}
                    onChange={(e) => setNewStudentClass(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Linked Student Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahim Ahmed"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student ID Code</label>
                  <input
                    type="text"
                    placeholder="e.g. NSC2025001"
                    value={newStudentCode}
                    onChange={(e) => setNewStudentCode(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (Emergency)</label>
                  <input
                    type="text"
                    required
                    placeholder="+880 17XX-XXXXXX"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="parent@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Occupation / Profession</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Software Engineer / Doctor"
                  value={newOccupation}
                  onChange={(e) => setNewOccupation(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  placeholder="e.g. Sector 7, Uttara, Dhaka"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              {/* Portal Access Password */}
              <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                    <Key className="w-3.5 h-3.5 text-blue-600" />
                    <span>Parent Portal Access Password</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const rand = Math.floor(1000 + Math.random() * 9000);
                      setNewPassword(`PRN@${rand}`);
                    }}
                    className="text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-white px-2 py-0.5 rounded-lg border border-blue-200 shadow-xs"
                  >
                    Auto-Generate
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Set guardian password (e.g. PRN@2025)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full text-xs p-2.5 pr-10 bg-white border border-blue-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Parent/Guardian will use their <strong>Phone / Student ID</strong> and this <strong>Password</strong> to log in.
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
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
                  Save Guardian Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PARENT CREDENTIAL HANDOUT PASS */}
      {credentialModalData && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Guardian Enrolled!</h3>
            <p className="text-xs text-slate-500 mb-4">Official login credentials generated for parent monitoring portal.</p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 mb-4 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-1.5 font-sans">
                <span className="text-slate-500">Guardian:</span>
                <span className="font-bold text-slate-900">{credentialModalData.name} ({credentialModalData.relation})</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5 font-sans">
                <span className="text-slate-500">Child Enrolled:</span>
                <span className="font-bold text-slate-900">{credentialModalData.studentName} ({credentialModalData.studentCode})</span>
              </div>
              <div className="flex justify-between items-center bg-blue-50/70 p-2 rounded-xl border border-blue-100">
                <span className="font-sans text-blue-900 font-bold">Login Phone / ID:</span>
                <span className="font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                  {credentialModalData.phone}
                </span>
              </div>
              <div className="flex justify-between items-center bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
                <span className="font-sans text-emerald-900 font-bold">Password:</span>
                <span className="font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  {credentialModalData.password}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  const text = `Northern Star Smart Campus - Parent Portal Login\nGuardian: ${credentialModalData.name}\nStudent: ${credentialModalData.studentName}\nLogin: ${credentialModalData.phone}\nPassword: ${credentialModalData.password}\nPortal: https://web-seven-blond-14.vercel.app`;
                  navigator.clipboard.writeText(text);
                  setCopiedCredential(true);
                  setTimeout(() => setCopiedCredential(false), 2500);
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-sm ${
                  copiedCredential ? 'bg-emerald-600 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {copiedCredential ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Credentials Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Login Pass for Guardian</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setCredentialModalData(null)}
                className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
