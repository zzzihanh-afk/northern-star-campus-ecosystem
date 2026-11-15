'use client';

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  Award,
  BookOpen,
  CheckCircle2,
  X,
  UserCheck,
  Building,
} from 'lucide-react';
import { Teacher } from '@/lib/types';
import { dataService } from '@/lib/data-service';

export const TeacherManagementView: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding teacher
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newDept, setNewDept] = useState('Mathematics');
  const [newDesignation, setNewDesignation] = useState('Senior Lecturer');
  const [newQualification, setNewQualification] = useState('');
  const [newSpecialization, setNewSpecialization] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSalary, setNewSalary] = useState(65000);
  const [newGender, setNewGender] = useState<'male' | 'female'>('male');

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    const data = await dataService.getTeachers();
    // Pre-populate with diverse faculty records
    const initialList: Teacher[] = [
      ...data,
      {
        id: 't-3',
        profile_id: 'p-t3',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        employee_id_code: 'NST202503',
        qualification: 'M.A. in English Literature, University of Dhaka',
        specialization: 'Advanced English & Rhetoric',
        salary: 62000,
        department_name: 'English & Humanities',
        designation_title: 'Lecturer',
        profile: {
          id: 'p-t3',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'tahmina.begum@northernstar.edu.bd',
          full_name: 'Mrs. Tahmina Begum',
          role: 'teacher',
          phone: '+880 1714-112233',
          gender: 'female',
          is_active: true,
        },
      },
      {
        id: 't-4',
        profile_id: 'p-t4',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        employee_id_code: 'NST202504',
        qualification: 'M.Sc. in Computer Science & Engineering',
        specialization: 'Programming, Data Structures & ICT',
        salary: 68000,
        department_name: 'ICT & Computing',
        designation_title: 'Assistant Professor & Lab Head',
        profile: {
          id: 'p-t4',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'ashraf.uzzaman@northernstar.edu.bd',
          full_name: 'Engr. Ashraf Uzzaman',
          role: 'teacher',
          phone: '+880 1716-445566',
          gender: 'male',
          is_active: true,
        },
      },
      {
        id: 't-5',
        profile_id: 'p-t5',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        employee_id_code: 'NST202505',
        qualification: 'M.Sc. in Chemistry, Rajshahi University',
        specialization: 'Organic & Inorganic Chemistry',
        salary: 64000,
        department_name: 'Natural Sciences',
        designation_title: 'Senior Lecturer',
        profile: {
          id: 'p-t5',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'rashidul.hasan@northernstar.edu.bd',
          full_name: 'Dr. Rashidul Hasan',
          role: 'teacher',
          phone: '+880 1717-778899',
          gender: 'male',
          is_active: true,
        },
      },
    ];
    setTeachers(initialList);
  };

  const departments = [
    'All',
    'Mathematics',
    'Natural Sciences',
    'English & Humanities',
    'ICT & Computing',
    'Commerce & Business',
  ];

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newIdNum = teachers.length + 1;
    const generatedCode = newCode.trim() || `NST20250${newIdNum}`;

    const newTeacherItem: Teacher = {
      id: `t-${Date.now()}`,
      profile_id: `p-t-${Date.now()}`,
      institution_id: 'a0000000-0000-0000-0000-000000000001',
      employee_id_code: generatedCode,
      department_name: newDept,
      designation_title: newDesignation,
      qualification: newQualification || 'M.Sc. / M.A. Degree',
      specialization: newSpecialization || `${newDept} Studies`,
      salary: Number(newSalary) || 60000,
      profile: {
        id: `p-t-${Date.now()}`,
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        full_name: newName,
        email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@northernstar.edu.bd`,
        phone: newPhone || '+880 1700-000000',
        role: 'teacher',
        gender: newGender,
        is_active: true,
      },
    };

    setTeachers([newTeacherItem, ...teachers]);
    setShowAddModal(false);
    setNewName('');
    setNewCode('');
    setNewQualification('');
    setNewSpecialization('');
    setNewPhone('');
    setNewEmail('');
  };

  const filteredTeachers = teachers.filter((t) => {
    const nameMatch = t.profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const codeMatch = t.employee_id_code?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const specMatch = t.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const deptMatch = selectedDept === 'All' || t.department_name === selectedDept;
    return (nameMatch || codeMatch || specMatch) && deptMatch;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
              Faculty & Teacher Management
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Academic faculty directory, department allocations, qualifications, and teacher profiles.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-blue-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Teacher</span>
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
            <span className="text-[11px] font-semibold text-slate-400 block">Total Faculty</span>
            <span className="text-lg font-black text-slate-900">{teachers.length} Teachers</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Departments</span>
            <span className="text-lg font-black text-purple-600">6 Academic Depts</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Post-Grad / PhD</span>
            <span className="text-lg font-black text-emerald-600">100% Certified</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Status Today</span>
            <span className="text-lg font-black text-amber-600">All Active on Duty</span>
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
            placeholder="Search teacher, ID, subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 4. Faculty Directory Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Official Faculty Directory</h3>
            <p className="text-xs text-slate-400">
              Showing {filteredTeachers.length} appointed faculty members across senior secondary & college divisions.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Teacher ID</th>
                <th className="py-2.5 px-3">Faculty Member</th>
                <th className="py-2.5 px-3">Department & Designation</th>
                <th className="py-2.5 px-3">Qualification & Specialization</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-mono font-bold text-blue-600">{teacher.employee_id_code}</td>
                  <td className="py-3 px-3">
                    <strong className="text-slate-900 block">{teacher.profile?.full_name}</strong>
                    <span className="text-[11px] text-slate-400">{teacher.profile?.gender === 'female' ? 'Female' : 'Male'}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-800 block">{teacher.department_name}</span>
                    <span className="text-[11px] text-blue-600 font-medium">{teacher.designation_title}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-slate-700 block font-medium">{teacher.qualification}</span>
                    <span className="text-[11px] text-slate-400">{teacher.specialization}</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-col space-y-0.5">
                      <a href={`tel:${teacher.profile?.phone}`} className="text-slate-700 hover:text-blue-600 font-mono text-[11px] flex items-center">
                        <Phone className="w-3 h-3 mr-1 text-slate-400" />
                        <span>{teacher.profile?.phone}</span>
                      </a>
                      <a href={`mailto:${teacher.profile?.email}`} className="text-slate-500 hover:text-blue-600 text-[11px] flex items-center">
                        <Mail className="w-3 h-3 mr-1 text-slate-400" />
                        <span>{teacher.profile?.email}</span>
                      </a>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active Faculty
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">Add Faculty Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">Register a new teacher or academic lecturer to the institution.</p>

            <form onSubmit={handleAddTeacher} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Kazi Anowar Hossain"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teacher ID Code</label>
                  <input
                    type="text"
                    placeholder="e.g. NST202506"
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
                    <option value="Mathematics">Mathematics</option>
                    <option value="Natural Sciences">Natural Sciences</option>
                    <option value="English & Humanities">English & Humanities</option>
                    <option value="ICT & Computing">ICT & Computing</option>
                    <option value="Commerce & Business">Commerce & Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                  <select
                    value={newDesignation}
                    onChange={(e) => setNewDesignation(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Senior Lecturer">Senior Lecturer</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Department Head">Department Head</option>
                    <option value="Assistant Teacher">Assistant Teacher</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Qualification</label>
                <input
                  type="text"
                  placeholder="e.g. M.Sc. in Physics, BUET"
                  value={newQualification}
                  onChange={(e) => setNewQualification(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Specialization</label>
                <input
                  type="text"
                  placeholder="e.g. Higher Mathematics & Applied Statistics"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Salary (৳ BDT)</label>
                <input
                  type="number"
                  value={newSalary}
                  onChange={(e) => setNewSalary(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
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
                  Save Teacher Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
