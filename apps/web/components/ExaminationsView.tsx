'use client';

import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Calendar,
  Clock,
  Plus,
  Search,
  Building,
  Users,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Download,
  Filter,
  X,
  Printer,
} from 'lucide-react';

interface ExamScheduleItem {
  id: string;
  examTerm: string;
  subject: string;
  subjectCode: string;
  className: string;
  date: string;
  timeSlot: string;
  hallRoom: string;
  invigilator: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
}

interface HallAllocation {
  id: string;
  hallName: string;
  building: string;
  capacity: number;
  assignedClass: string;
  rollRange: string;
  chiefInvigilator: string;
}

export const ExaminationsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'routine' | 'halls' | 'admit_cards'>('routine');
  const [selectedTerm, setSelectedTerm] = useState('Annual Examination 2025');
  const [searchTerm, setSearchTerm] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const [schedules, setSchedules] = useState<ExamScheduleItem[]>([
    {
      id: 'sch-1',
      examTerm: 'Annual Examination 2025',
      subject: 'Higher Mathematics',
      subjectCode: 'MTH-101',
      className: 'Class 9 (Sections A, B)',
      date: '2025-11-20',
      timeSlot: '09:00 AM - 12:00 PM',
      hallRoom: 'Auditorium Hall A',
      invigilator: 'Prof. Nazmul Haque',
      status: 'Scheduled',
    },
    {
      id: 'sch-2',
      examTerm: 'Annual Examination 2025',
      subject: 'Physics (Paper 1)',
      subjectCode: 'PHY-102',
      className: 'Class 10 (Section A)',
      date: '2025-11-22',
      timeSlot: '09:00 AM - 12:00 PM',
      hallRoom: 'Science Wing Room 301',
      invigilator: 'Dr. Farhad Hossain',
      status: 'Scheduled',
    },
    {
      id: 'sch-3',
      examTerm: 'Annual Examination 2025',
      subject: 'English Language & Composition',
      subjectCode: 'ENG-103',
      className: 'Class 9 (Sections A, B)',
      date: '2025-11-24',
      timeSlot: '09:00 AM - 12:00 PM',
      hallRoom: 'Main Academic Wing 204',
      invigilator: 'Raymond Murphy',
      status: 'Scheduled',
    },
    {
      id: 'sch-4',
      examTerm: 'Annual Examination 2025',
      subject: 'Chemistry (Paper 1)',
      subjectCode: 'CHM-104',
      className: 'HSC 1st Year (Science)',
      date: '2025-11-26',
      timeSlot: '01:30 PM - 04:30 PM',
      hallRoom: 'Auditorium Hall B',
      invigilator: 'Prof. Shamsul Islam',
      status: 'Scheduled',
    },
    {
      id: 'sch-5',
      examTerm: 'Annual Examination 2025',
      subject: 'Bangla 1st Paper',
      subjectCode: 'BNG-105',
      className: 'Class 9 & 10',
      date: '2025-11-18',
      timeSlot: '09:00 AM - 12:00 PM',
      hallRoom: 'Auditorium Hall A & B',
      invigilator: 'Rashida Begum',
      status: 'Completed',
    },
  ]);

  const halls: HallAllocation[] = [
    {
      id: 'h-1',
      hallName: 'Auditorium Hall A',
      building: 'Main Cultural & Exam Complex',
      capacity: 120,
      assignedClass: 'Class 9 (Sections A & B)',
      rollRange: 'NSC2025001 – NSC2025090',
      chiefInvigilator: 'Prof. Nazmul Haque',
    },
    {
      id: 'h-2',
      hallName: 'Science Wing Room 301',
      building: 'Science & STEM Block',
      capacity: 45,
      assignedClass: 'Class 10 (Section A)',
      rollRange: 'NSC2024001 – NSC2024045',
      chiefInvigilator: 'Dr. Farhad Hossain',
    },
    {
      id: 'h-3',
      hallName: 'Auditorium Hall B',
      building: 'Main Cultural & Exam Complex',
      capacity: 120,
      assignedClass: 'HSC 1st Year (Science & Commerce)',
      rollRange: 'NSC2025201 – NSC2025300',
      chiefInvigilator: 'Prof. Shamsul Islam',
    },
    {
      id: 'h-4',
      hallName: 'Academic Block Room 204',
      building: 'Senior Secondary Wing',
      capacity: 40,
      assignedClass: 'Class 8 (Section A)',
      rollRange: 'NSC2026001 – NSC2026040',
      chiefInvigilator: 'Tahmina Akhter',
    },
  ];

  // Form states for scheduling an exam
  const [newSubject, setNewSubject] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newClass, setNewClass] = useState('Class 9-A');
  const [newDate, setNewDate] = useState('2025-11-28');
  const [newTimeSlot, setNewTimeSlot] = useState('09:00 AM - 12:00 PM');
  const [newHall, setNewHall] = useState('Auditorium Hall A');
  const [newInvigilator, setNewInvigilator] = useState('Dr. Farhad Hossain');

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim()) return;

    const newItem: ExamScheduleItem = {
      id: `sch-${Date.now()}`,
      examTerm: selectedTerm,
      subject: newSubject,
      subjectCode: newCode || 'SUB-100',
      className: newClass,
      date: newDate,
      timeSlot: newTimeSlot,
      hallRoom: newHall,
      invigilator: newInvigilator,
      status: 'Scheduled',
    };

    setSchedules([...schedules, newItem]);
    setShowScheduleModal(false);
    setNewSubject('');
    setNewCode('');
  };

  const filteredSchedules = schedules.filter(
    (s) =>
      s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.hallRoom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.invigilator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
            <FileSpreadsheet className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
              Examination Schedules & Hall Planning
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Assessment terms routine planning, exam halls seat matrix, invigilator rosters and student admit cards.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              alert('All official admit cards generated and verified with QR codes.');
            }}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Batch Admit Cards</span>
          </button>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Exam</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Active Exam Term</span>
            <span className="text-xs font-bold text-slate-900 truncate block max-w-[150px]">
              {selectedTerm}
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Exam Halls Ready</span>
            <span className="text-lg font-black text-purple-600">14 Halls</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Scheduled Papers</span>
            <span className="text-lg font-black text-emerald-600">{schedules.length} Papers</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Invigilator Faculty</span>
            <span className="text-lg font-black text-amber-600">32 Teachers</span>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('routine')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'routine'
                ? 'bg-[#0B1E38] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Exam Routines ({filteredSchedules.length})
          </button>
          <button
            onClick={() => setActiveTab('halls')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'halls'
                ? 'bg-[#0B1E38] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Hall Seat Planning ({halls.length})
          </button>
          <button
            onClick={() => setActiveTab('admit_cards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'admit_cards'
                ? 'bg-[#0B1E38] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Student Admit Cards
          </button>
        </div>

        <div className="relative sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search subject, room, teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 4. TAB 1: EXAM ROUTINE TIMETABLE */}
      {activeTab === 'routine' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Official Exam Routine & Timetable</h3>
              <p className="text-xs text-slate-400">
                Authorized dates, time slots, room numbers, and invigilator duties.
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
              {selectedTerm}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Time Slot</th>
                  <th className="py-2.5 px-3">Subject & Code</th>
                  <th className="py-2.5 px-3">Class / Target</th>
                  <th className="py-2.5 px-3">Exam Hall</th>
                  <th className="py-2.5 px-3">Chief Invigilator</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSchedules.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{s.date}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{s.timeSlot}</td>
                    <td className="py-2.5 px-3">
                      <strong className="text-slate-900 block">{s.subject}</strong>
                      <span className="text-[10px] font-mono text-blue-600">{s.subjectCode}</span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700">{s.className}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-slate-900 font-medium">{s.hallRoom}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{s.invigilator}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          s.status === 'Completed'
                            ? 'bg-slate-100 text-slate-600 border-slate-200'
                            : s.status === 'In Progress'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TAB 2: HALL SEAT PLANNING */}
      {activeTab === 'halls' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {halls.map((h) => (
            <div
              key={h.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{h.hallName}</h4>
                    <p className="text-[11px] text-slate-400">{h.building}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  {h.capacity} Seats
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Allocated Class:</span>
                  <strong className="text-slate-800">{h.assignedClass}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Roll Number Range:</span>
                  <span className="font-mono text-blue-600 font-bold">{h.rollRange}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200/60">
                  <span className="text-slate-400">Chief Invigilator:</span>
                  <span className="text-slate-700 font-medium">{h.chiefInvigilator}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. TAB 3: ADMIT CARDS & AUTHENTICATION */}
      {activeTab === 'admit_cards' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Student Admit Card Generation</h3>
              <p className="text-xs text-slate-400">
                Digitally signed admit cards with encrypted QR verification tokens and fee clearance flags.
              </p>
            </div>
            <button
              onClick={() => alert('Batch admit cards generated for Class 9 and 10.')}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Printable Batch</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'NSC2025001', name: 'Rahim Ahmed', class: 'Class 9-A', feesCleared: true, token: 'ADM-901-2025' },
              { id: 'NSC2025002', name: 'Sadia Islam', class: 'Class 9-A', feesCleared: true, token: 'ADM-902-2025' },
              { id: 'NSC2025003', name: 'Tahsin Alam', class: 'Class 10-A', feesCleared: true, token: 'ADM-903-2025' },
            ].map((st) => (
              <div key={st.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">{st.name}</span>
                  <span className="text-[10px] font-mono text-blue-600 font-bold">{st.id}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{st.class}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Fees Cleared
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">{st.token}</span>
                  <button
                    onClick={() => alert(`Admit card for ${st.name} downloaded.`)}
                    className="text-[11px] font-bold text-blue-600 hover:underline flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Admit PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Schedule Exam */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Schedule Examination Paper</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddSchedule} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Higher Mathematics"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject Code</label>
                  <input
                    type="text"
                    placeholder="MTH-101"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                  <input
                    type="text"
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Exam Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Exam Hall</label>
                <input
                  type="text"
                  value={newHall}
                  onChange={(e) => setNewHall(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Invigilator Teacher</label>
                <input
                  type="text"
                  value={newInvigilator}
                  onChange={(e) => setNewInvigilator(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
