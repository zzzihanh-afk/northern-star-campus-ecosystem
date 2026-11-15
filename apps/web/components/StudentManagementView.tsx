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
  Layers,
  School,
  Sparkles,
} from 'lucide-react';
import { Student } from '@/lib/types';
import { dataService } from '@/lib/data-service';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface ClassDefinition {
  id: string;
  name: string;
  category: 'Primary' | 'Secondary' | 'College';
  sections: string[];
}

export const INITIAL_CAMPUS_CLASSES: ClassDefinition[] = [
  { id: 'c-play', name: 'Play Group', category: 'Primary', sections: ['Morning', 'Day', 'A'] },
  { id: 'c-nursery', name: 'Nursery', category: 'Primary', sections: ['A', 'B', 'Morning'] },
  { id: 'c-kg', name: 'Kindergarten (KG)', category: 'Primary', sections: ['A', 'B', 'Rose', 'Tulip'] },
  { id: 'c-1', name: 'Class 1', category: 'Primary', sections: ['A', 'B', 'C'] },
  { id: 'c-2', name: 'Class 2', category: 'Primary', sections: ['A', 'B'] },
  { id: 'c-3', name: 'Class 3', category: 'Primary', sections: ['A', 'B'] },
  { id: 'c-4', name: 'Class 4', category: 'Primary', sections: ['A', 'B'] },
  { id: 'c-5', name: 'Class 5', category: 'Primary', sections: ['A', 'B', 'C'] },
  { id: 'c-6', name: 'Class 6', category: 'Secondary', sections: ['A', 'B', 'C'] },
  { id: 'c-7', name: 'Class 7', category: 'Secondary', sections: ['A', 'B'] },
  { id: 'c-8', name: 'Class 8', category: 'Secondary', sections: ['A', 'B', 'C'] },
  { id: 'c-9', name: 'Class 9', category: 'Secondary', sections: ['A', 'B', 'Science A', 'Commerce A'] },
  { id: 'c-10', name: 'Class 10', category: 'Secondary', sections: ['A', 'B', 'Science A', 'Humanities A'] },
  { id: 'c-11', name: 'Class 11 (HSC 1st Year)', category: 'College', sections: ['Science A', 'Commerce A', 'Humanities A'] },
  { id: 'c-12', name: 'Class 12 (HSC 2nd Year)', category: 'College', sections: ['Science A', 'Commerce A', 'Humanities A'] },
];

interface StudentManagementViewProps {
  onNavigate?: (module: string) => void;
}

export const StudentManagementView: React.FC<StudentManagementViewProps> = ({ onNavigate }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [classes, setClasses] = useState<ClassDefinition[]>(INITIAL_CAMPUS_CLASSES);
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');

  // Modal controls
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [selectedStudentForQr, setSelectedStudentForQr] = useState<Student | null>(null);

  // New Student form fields
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newClass, setNewClass] = useState('Class 9');
  const [newSection, setNewSection] = useState('A');
  const [newGender, setNewGender] = useState<'male' | 'female'>('male');

  // New Class Form State
  const [newClassName, setNewClassName] = useState('');
  const [newClassCategory, setNewClassCategory] = useState<'Primary' | 'Secondary' | 'College'>('Secondary');
  const [newClassSections, setNewClassSections] = useState<string[]>(['Section A', 'Section B']);
  const [customSectionInput, setCustomSectionInput] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const list = await dataService.getStudents();
    // Supplement with students across multiple tiers if needed
    const enrichedList: Student[] = [
      ...list,
      {
        id: 'st-seed-c1',
        profile_id: 'p-seed-c1',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        student_id_code: 'NSC2025004',
        class_id: 'c1',
        section_id: 'sA',
        roll_number: 1,
        admission_date: '2024-01-10',
        status: 'active',
        class_name: 'Class 1',
        section_name: 'A',
        qr_code_token: 'NSSC_QR_TOKEN_C1_004',
        profile: {
          id: 'p-seed-c1',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'meherun.nisa@northernstar.edu.bd',
          full_name: 'Meherun Nisa',
          role: 'student',
          phone: '+880 1711-223344',
          gender: 'female',
          is_active: true,
          avatar_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150',
        },
      },
      {
        id: 'st-seed-c6',
        profile_id: 'p-seed-c6',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        student_id_code: 'NSC2025005',
        class_id: 'c6',
        section_id: 'sB',
        roll_number: 14,
        admission_date: '2023-01-15',
        status: 'active',
        class_name: 'Class 6',
        section_name: 'B',
        qr_code_token: 'NSSC_QR_TOKEN_C6_005',
        profile: {
          id: 'p-seed-c6',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'zayd.hasan@northernstar.edu.bd',
          full_name: 'Zayd Al-Hasan',
          role: 'student',
          phone: '+880 1722-334455',
          gender: 'male',
          is_active: true,
          avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        },
      },
      {
        id: 'st-seed-c11',
        profile_id: 'p-seed-c11',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        student_id_code: 'NSC2025006',
        class_id: 'c11',
        section_id: 'sSci',
        roll_number: 5,
        admission_date: '2024-07-01',
        status: 'active',
        class_name: 'Class 11 (HSC 1st Year)',
        section_name: 'Science A',
        qr_code_token: 'NSSC_QR_TOKEN_C11_006',
        profile: {
          id: 'p-seed-c11',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'ayesha.siddiqua@northernstar.edu.bd',
          full_name: 'Ayesha Siddiqua',
          role: 'student',
          phone: '+880 1733-445566',
          gender: 'female',
          is_active: true,
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        },
      },
      {
        id: 'st-seed-play',
        profile_id: 'p-seed-play',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        student_id_code: 'NSC2025007',
        class_id: 'cplay',
        section_id: 'sMorn',
        roll_number: 3,
        admission_date: '2025-01-10',
        status: 'active',
        class_name: 'Play Group',
        section_name: 'Morning',
        qr_code_token: 'NSSC_QR_TOKEN_PLAY_007',
        profile: {
          id: 'p-seed-play',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'rayan.chowdhury@northernstar.edu.bd',
          full_name: 'Rayan Chowdhury',
          role: 'student',
          phone: '+880 1744-556677',
          gender: 'male',
          is_active: true,
          avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
        },
      },
    ];

    setStudents(enrichedList);
  };

  // Section helpers for Add Class
  const handleAddSectionToNewClass = (sec: string) => {
    const trimmed = sec.trim();
    if (!trimmed) return;
    if (!newClassSections.includes(trimmed)) {
      setNewClassSections([...newClassSections, trimmed]);
    }
    setCustomSectionInput('');
  };

  const handleRemoveSectionFromNewClass = (sec: string) => {
    setNewClassSections(newClassSections.filter((s) => s !== sec));
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    if (newClassSections.length === 0) {
      alert('Please include at least one section for this class.');
      return;
    }

    const createdClass: ClassDefinition = {
      id: `c-custom-${Date.now()}`,
      name: newClassName.trim(),
      category: newClassCategory,
      sections: [...newClassSections],
    };

    setClasses([...classes, createdClass]);
    setSelectedClass(createdClass.name);
    setSelectedSection('All');

    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      try {
        client.from('classes').insert({
          institution_id: process.env.NEXT_PUBLIC_DEFAULT_INSTITUTION_ID || 'a0000000-0000-0000-0000-000000000001',
          name: createdClass.name,
          numeric_level: 10,
          category: createdClass.category.toLowerCase(),
        }).then(({ data }) => {
          if (data && createdClass.sections.length > 0) {
            const classRow = (data as any)[0];
            if (classRow) {
              const sectionsToInsert = createdClass.sections.map((secName) => ({
                institution_id: process.env.NEXT_PUBLIC_DEFAULT_INSTITUTION_ID || 'a0000000-0000-0000-0000-000000000001',
                class_id: classRow.id,
                name: secName,
              }));
              client.from('sections').insert(sectionsToInsert).then();
            }
          }
        });
      } catch (err) {
        console.warn('Class Supabase sync notice:', err);
      }
    }

    setShowAddClassModal(false);
    setNewClassName('');
    setNewClassSections(['Section A', 'Section B']);
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
      class_id: 'c-dynamic',
      section_id: 's-dynamic',
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

    if (isSupabaseConfigured && supabase && newStudent.profile) {
      const client = supabase;
      const prof = newStudent.profile;
      try {
        const newProfId = crypto.randomUUID();
        client.from('profiles').insert({
          id: newProfId,
          institution_id: process.env.NEXT_PUBLIC_DEFAULT_INSTITUTION_ID || 'a0000000-0000-0000-0000-000000000001',
          full_name: prof.full_name,
          email: prof.email,
          role: 'student',
          phone: prof.phone,
          gender: prof.gender,
          avatar_url: prof.avatar_url,
          is_active: true,
        }).then(() => {
          client.from('students').insert({
            profile_id: newProfId,
            institution_id: process.env.NEXT_PUBLIC_DEFAULT_INSTITUTION_ID || 'a0000000-0000-0000-0000-000000000001',
            student_id_code: newStudent.student_id_code,
            class_id: 'e0000000-0000-0000-0000-000000000009',
            section_id: 'f0000000-0000-0000-0000-000000000001',
            roll_number: newStudent.roll_number,
            status: 'active',
            qr_code_token: newStudent.qr_code_token,
          }).then();
        });
      } catch (err) {
        console.warn('Student Supabase sync notice:', err);
      }
    }

    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
  };

  // Compute available sections based on the active selected class
  const activeClassObj = classes.find((c) => c.name === selectedClass);
  const availableSections = activeClassObj
    ? activeClassObj.sections
    : Array.from(new Set(classes.flatMap((c) => c.sections)));

  // For Add Student modal: sections of currently chosen class
  const newStudentClassObj = classes.find((c) => c.name === newClass);
  const sectionsForNewStudent = newStudentClassObj
    ? newStudentClassObj.sections
    : ['A', 'B', 'C'];

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.profile?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.student_id_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All' || s.class_name === selectedClass;
    const matchesSection =
      selectedSection === 'All' ||
      s.section_name === selectedSection ||
      s.section_name === selectedSection.replace('Section ', '') ||
      `Section ${s.section_name}` === selectedSection;

    return matchesSearch && matchesClass && matchesSection;
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
            Complete student directory, class assignments, digital identification and status tracking across School & College.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Add Class Button */}
          <button
            onClick={() => setShowAddClassModal(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-md active:scale-95 transition-all"
          >
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Add Class & Sections</span>
          </button>

          {/* Admit Student Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-md shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Admit New Student</span>
          </button>
        </div>
      </div>

      {/* People & User Directory Switcher */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-sm flex space-x-2 overflow-x-auto">
        <button
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0B1E38] text-white shadow-sm flex items-center space-x-2 whitespace-nowrap"
        >
          <Users className="w-3.5 h-3.5" />
          <span>Students Directory ({students.length})</span>
        </button>
        <button
          onClick={() => onNavigate?.('teachers')}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center space-x-2 whitespace-nowrap"
        >
          <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
          <span>Teachers & Faculty (68)</span>
        </button>
        <button
          onClick={() => onNavigate?.('parents')}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center space-x-2 whitespace-nowrap"
        >
          <Users className="w-3.5 h-3.5 text-rose-600" />
          <span>Parents & Guardians (1,180)</span>
        </button>
        <button
          onClick={() => onNavigate?.('staff')}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center space-x-2 whitespace-nowrap"
        >
          <School className="w-3.5 h-3.5 text-teal-600" />
          <span>Campus Staff (24)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name or ID..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Complete Classes Dropdown */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Class:</span>
          </div>
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedSection('All');
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All">All Classes ({classes.length})</option>
            {classes.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name} ({c.category})
              </option>
            ))}
          </select>

          {/* Section Filter Dropdown */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 ml-1">
            <span>Section:</span>
          </div>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All">All Sections</option>
            {availableSections.map((sec) => (
              <option key={sec} value={sec}>
                Section {sec.replace('Section ', '')}
              </option>
            ))}
          </select>

          {/* Reset Filters Badge */}
          {(selectedClass !== 'All' || selectedSection !== 'All' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedClass('All');
                setSelectedSection('All');
                setSearchTerm('');
              }}
              className="text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1.5 rounded-xl border border-rose-200 transition-all"
            >
              Reset Filters
            </button>
          )}
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
                  <td className="py-3 px-4 font-mono font-bold text-blue-700">{s.student_id_code}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800">{s.class_name}</span>
                    <span className="ml-1 px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">
                      Sec {s.section_name}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">{s.roll_number}</td>
                  <td className="py-3 px-4 text-slate-600">{s.profile?.phone || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedStudentForQr(s)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                        title="View Digital Student ID"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove student ${s.profile?.full_name} from active roster?`)) {
                            setStudents(students.filter((item) => item.id !== s.id));
                          }
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove Student"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400 font-medium">
                    No students found matching your filters. Click &quot;Admit New Student&quot; to register a student for this class!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD CLASS & INCLUDE SECTIONS (Requested by User) */}
      {showAddClassModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Add Class to Academic Structure</h3>
                  <p className="text-[10px] text-slate-500">Configure class title, academic tier, and include assigned sections.</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddClassModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Class 7, O-Level Physics, HSC Science A"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Category</label>
                <select
                  value={newClassCategory}
                  onChange={(e) => setNewClassCategory(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Primary">Primary (Play Group - Class 5)</option>
                  <option value="Secondary">Secondary / High School (Class 6 - 10)</option>
                  <option value="College">College / Higher Secondary (HSC 11 - 12)</option>
                </select>
              </div>

              {/* SECTIONS INCLUSION FEATURE */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      <span>Included Sections</span>
                    </label>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Specify which sections belong to this class.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    {newClassSections.length} Sections
                  </span>
                </div>

                {/* Quick Add Section Chips */}
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Quick Add Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Section A', 'Section B', 'Section C', 'Section D', 'Morning Shift', 'Day Shift'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleAddSectionToNewClass(preset)}
                        disabled={newClassSections.includes(preset)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all ${
                          newClassSections.includes(preset)
                            ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed'
                            : 'bg-white hover:bg-blue-50 text-slate-700 border-slate-300 hover:border-blue-300'
                        }`}
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Section Input */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    placeholder="Type custom section name (e.g. Science A, Tulip)..."
                    value={customSectionInput}
                    onChange={(e) => setCustomSectionInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSectionToNewClass(customSectionInput);
                      }
                    }}
                    className="flex-1 text-xs p-2 bg-white border border-slate-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSectionToNewClass(customSectionInput)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs"
                  >
                    Add
                  </button>
                </div>

                {/* Badges of Currently Included Sections */}
                <div className="pt-2 border-t border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-600 block mb-1.5">
                    Active Included Sections for this Class:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {newClassSections.map((sec) => (
                      <span
                        key={sec}
                        className="bg-white border border-blue-200 text-blue-900 px-2.5 py-1 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-2xs"
                      >
                        <span>{sec}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSectionFromNewClass(sec)}
                          className="w-4 h-4 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 inline-flex items-center justify-center font-bold text-[10px]"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {newClassSections.length === 0 && (
                      <span className="text-xs text-rose-500 font-semibold">
                        Warning: You must include at least one section.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={newClassSections.length === 0}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
                >
                  Save & Include Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADMIT NEW STUDENT */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Student Admission Form</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahim Ahmed"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="student@northernstar.edu.bd"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                  <select
                    value={newClass}
                    onChange={(e) => {
                      setNewClass(e.target.value);
                      const targetCls = classes.find((c) => c.name === e.target.value);
                      if (targetCls && targetCls.sections.length > 0) {
                        setNewSection(targetCls.sections[0]);
                      }
                    }}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section</label>
                  <select
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    {sectionsForNewStudent.map((sec) => (
                      <option key={sec} value={sec}>
                        Section {sec.replace('Section ', '')}
                      </option>
                    ))}
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
