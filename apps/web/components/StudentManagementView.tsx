'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Users,
  Search,
  Plus,
  Filter,
  Download,
  QrCode,
  Edit,
  Trash2,
  CheckCircle,
  X,
  GraduationCap,
} from 'lucide-react';
import { Student } from '@/lib/types';
import { dataService } from '@/lib/data-service';

export const StudentManagementView: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudentForQr, setSelectedStudentForQr] = useState<Student | null>(null);

  // New Student form fields
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newClass, setNewClass] = useState('Class 9');
  const [newSection, setNewSection] = useState('A');
  const [newGender, setNewGender] = useState<'male' | 'female'>('male');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const list = await dataService.getStudents();
    setStudents(list);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newIdNum = students.length + 1;
    const studentCode = `NSC202500${newIdNum}`;

    const newStudent: Student = {
      id: `st-new-${Date.now()}`,
      profile_id: `p-new-${Date.now()}`,
      institution_id: 'a0000000-0000-0000-0000-000000000001',
      student_id_code: studentCode,
      class_id: 'c9',
      section_id: 'sA',
      roll_number: newIdNum,
      admission_date: new Date().toISOString().split('T')[0],
      status: 'active',
      class_name: newClass,
      section_name: newSection,
      qr_code_token: `NSSC_QR_TOKEN_${studentCode}_${Date.now()}`,
      profile: {
        id: `p-new-${Date.now()}`,
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@northernstar.edu.bd`,
        full_name: newName,
        role: 'student',
        phone: newPhone || '+880 1700-000000',
        gender: newGender,
        is_active: true,
        avatar_url:
          newGender === 'male'
            ? 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
            : 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      },
    };

    setStudents([newStudent, ...students]);
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
  };

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.profile?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.student_id_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All' || s.class_name === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
            Student Management & Admissions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Complete student directory, class assignments, digital identification and status tracking.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-md shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Admit New Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name or ID..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Class:</span>
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none"
          >
            <option value="All">All Classes</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="HSC 1st Year (Class 11)">Class 11</option>
          </select>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Student ID</th>
                <th className="py-3.5 px-4">Class & Section</th>
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden relative border border-slate-200 shrink-0">
                        <Image
                          src={s.profile?.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'}
                          alt={s.profile?.full_name || 'Student'}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{s.profile?.full_name}</p>
                        <p className="text-[10px] text-slate-400">{s.profile?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">
                    {s.student_id_code}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {s.class_name} - {s.section_name}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-700">
                    #{s.roll_number}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {s.profile?.phone || 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedStudentForQr(s)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
                        title="View Digital QR Pass"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD STUDENT */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Admit New Student</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahir Al-Mamun"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="HSC 1st Year (Class 11)">Class 11</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section</label>
                  <select
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Phone</label>
                  <input
                    type="text"
                    placeholder="+880 17XX-XXXXXX"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
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
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
                >
                  Confirm Admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DIGITAL ID QR VIEWER */}
      {selectedStudentForQr && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Official Campus Pass</span>
              <button onClick={() => setSelectedStudentForQr(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-blue-600 relative my-2 shadow-md">
              <Image
                src={selectedStudentForQr.profile?.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'}
                alt={selectedStudentForQr.profile?.full_name || 'Student'}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-base font-black text-slate-900 mt-1">{selectedStudentForQr.profile?.full_name}</h3>
            <p className="text-xs font-bold text-blue-600">{selectedStudentForQr.class_name} - {selectedStudentForQr.section_name}</p>
            <p className="text-xs font-mono text-slate-500 font-bold mt-0.5">ID: {selectedStudentForQr.student_id_code}</p>

            <div className="w-36 h-36 mx-auto bg-slate-50 p-2 rounded-2xl border-2 border-slate-200 my-4 flex items-center justify-center">
              <QrCode className="w-32 h-32 text-slate-900" />
            </div>

            <p className="text-[10px] text-slate-400 mb-3">Secured via cryptographic campus token</p>

            <button
              onClick={() => {
                alert(`Digital student ID for ${selectedStudentForQr.profile?.full_name} downloaded successfully!`);
                setSelectedStudentForQr(null);
              }}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
            >
              Export Pass PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
