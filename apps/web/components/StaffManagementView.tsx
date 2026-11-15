'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  Building,
  DollarSign,
  Clock,
  CheckCircle2,
  X,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { Staff } from '@/lib/types';
import { dataService } from '@/lib/data-service';

export const StaffManagementView: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newDept, setNewDept] = useState('Administration');
  const [newDesignation, setNewDesignation] = useState('Administrative Officer');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSalary, setNewSalary] = useState(45000);
  const [newShift, setNewShift] = useState('Full-Time (8:00 AM - 4:00 PM)');
  const [newGender, setNewGender] = useState<'male' | 'female'>('male');

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    const data = await dataService.getStaff();
    // Pre-populate with diverse operational departments
    const initialList: Staff[] = [
      ...data,
      {
        id: 'stf-4',
        profile_id: 'p-stf4',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        employee_id_code: 'NSS202504',
        salary: 40000,
        department_name: 'Library & Archival',
        designation_title: 'Senior Cataloguer & Assistant Librarian',
        profile: {
          id: 'p-stf4',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'abdur.razzaq@northernstar.edu.bd',
          full_name: 'Mr. Abdur Razzaq',
          role: 'staff',
          phone: '+880 1720-334455',
          gender: 'male',
          is_active: true,
        },
      },
      {
        id: 'stf-5',
        profile_id: 'p-stf5',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        employee_id_code: 'NSS202505',
        salary: 35000,
        department_name: 'Campus Security & Safety',
        designation_title: 'Chief Security Supervisor',
        profile: {
          id: 'p-stf5',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'nurul.islam@northernstar.edu.bd',
          full_name: 'Sgt. Nurul Islam',
          role: 'staff',
          phone: '+880 1721-667788',
          gender: 'male',
          is_active: true,
        },
      },
      {
        id: 'stf-6',
        profile_id: 'p-stf6',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        employee_id_code: 'NSS202506',
        salary: 36000,
        department_name: 'Transport & Fleet',
        designation_title: 'Transport Logistics Coordinator',
        profile: {
          id: 'p-stf6',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'delowar.hossain@northernstar.edu.bd',
          full_name: 'Mr. Delowar Hossain',
          role: 'staff',
          phone: '+880 1722-990011',
          gender: 'male',
          is_active: true,
        },
      },
    ];
    setStaffList(initialList);
  };

  const departments = [
    'All',
    'Administration',
    'Finance & Accounts',
    'IT & Network Systems',
    'Library & Archival',
    'Campus Security & Safety',
    'Transport & Fleet',
  ];

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newIdNum = staffList.length + 1;
    const generatedCode = newCode.trim() || `NSS20250${newIdNum}`;

    const newStaffItem: Staff = {
      id: `stf-${Date.now()}`,
      profile_id: `p-stf-${Date.now()}`,
      institution_id: 'a0000000-0000-0000-0000-000000000001',
      employee_id_code: generatedCode,
      department_name: newDept,
      designation_title: newDesignation,
      salary: Number(newSalary) || 40000,
      profile: {
        id: `p-stf-${Date.now()}`,
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        full_name: newName,
        email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@northernstar.edu.bd`,
        phone: newPhone || '+880 1700-000000',
        role: 'staff',
        gender: newGender,
        is_active: true,
      },
    };

    setStaffList([newStaffItem, ...staffList]);
    setShowAddModal(false);
    setNewName('');
    setNewCode('');
    setNewPhone('');
    setNewEmail('');
  };

  const filteredStaff = staffList.filter((s) => {
    const nameMatch = s.profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const codeMatch = s.employee_id_code?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const desigMatch = s.designation_title?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const deptMatch = selectedDept === 'All' || s.department_name === selectedDept;
    return (nameMatch || codeMatch || desigMatch) && deptMatch;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl border border-teal-100">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
              Campus Staff & Employee Directory
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Administrative officers, accounts, IT systems, library, campus operations, and support staff.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-blue-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Total Staff Members</span>
            <span className="text-lg font-black text-slate-900">{staffList.length} Personnel</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Departments</span>
            <span className="text-lg font-black text-blue-600">6 Operations Units</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Daily Attendance</span>
            <span className="text-lg font-black text-emerald-600">100% On Duty</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Service Records</span>
            <span className="text-lg font-black text-purple-600">Verified</span>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDept === dept
                  ? 'bg-[#0B1E38] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="relative sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search staff, ID, designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 4. Staff Directory Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Personnel Roster & Work Allocations</h3>
            <p className="text-xs text-slate-400">
              Showing {filteredStaff.length} appointed personnel across campus operations & administration.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Staff ID</th>
                <th className="py-2.5 px-3">Staff Member</th>
                <th className="py-2.5 px-3">Department & Designation</th>
                <th className="py-2.5 px-3">Contact Details</th>
                <th className="py-2.5 px-3">Monthly Remuneration</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-mono font-bold text-blue-600">{staff.employee_id_code}</td>
                  <td className="py-3 px-3">
                    <strong className="text-slate-900 block">{staff.profile?.full_name}</strong>
                    <span className="text-[11px] text-slate-400">{staff.profile?.gender === 'female' ? 'Female' : 'Male'}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-800 block">{staff.department_name}</span>
                    <span className="text-[11px] text-teal-600 font-medium">{staff.designation_title}</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-col space-y-0.5">
                      <a href={`tel:${staff.profile?.phone}`} className="text-slate-700 hover:text-blue-600 font-mono text-[11px] flex items-center">
                        <Phone className="w-3 h-3 mr-1 text-slate-400" />
                        <span>{staff.profile?.phone}</span>
                      </a>
                      <a href={`mailto:${staff.profile?.email}`} className="text-slate-500 hover:text-blue-600 text-[11px] flex items-center">
                        <Mail className="w-3 h-3 mr-1 text-slate-400" />
                        <span>{staff.profile?.email}</span>
                      </a>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-slate-800">
                      ৳ {staff.salary ? staff.salary.toLocaleString() : '42,000'} / mo
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active On Duty
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">Add Campus Staff Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">Register an administrative, technical, accounts or operations employee.</p>

            <form onSubmit={handleAddStaff} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Md. Ashraful Alam"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Staff ID Code</label>
                  <input
                    type="text"
                    placeholder="e.g. NSS202507"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Administration">Administration</option>
                    <option value="Finance & Accounts">Finance & Accounts</option>
                    <option value="IT & Network Systems">IT & Network Systems</option>
                    <option value="Library & Archival">Library & Archival</option>
                    <option value="Campus Security & Safety">Campus Security & Safety</option>
                    <option value="Transport & Fleet">Transport & Fleet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Accounts Officer"
                    value={newDesignation}
                    onChange={(e) => setNewDesignation(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    placeholder="name@northernstar.edu.bd"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Salary (৳ BDT)</label>
                  <input
                    type="number"
                    value={newSalary}
                    onChange={(e) => setNewSalary(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Shift</label>
                  <select
                    value={newShift}
                    onChange={(e) => setNewShift(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Full-Time (8:00 AM - 4:00 PM)">Full-Time (8:00 AM - 4:00 PM)</option>
                    <option value="Morning Shift (7:00 AM - 2:00 PM)">Morning Shift (7:00 AM - 2:00 PM)</option>
                    <option value="Evening/Security Shift">Evening/Security Shift</option>
                  </select>
                </div>
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
                  Save Staff Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
