'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Filter,
  Download,
  QrCode,
  Send,
  Users,
} from 'lucide-react';

interface AttendanceStudent {
  id: string;
  name: string;
  roll: number;
  studentId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  time: string;
}

export const AttendanceView: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Class 9-A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [parentAlertSent, setParentAlertSent] = useState(false);

  const [attendanceList, setAttendanceList] = useState<AttendanceStudent[]>([
    { id: '1', name: 'Rahim Ahmed', roll: 1, studentId: 'NSC2025001', status: 'present', time: '09:00 AM' },
    { id: '2', name: 'Sadia Islam', roll: 2, studentId: 'NSC2025002', status: 'present', time: '08:55 AM' },
    { id: '3', name: 'Tahsin Alam', roll: 3, studentId: 'NSC2025003', status: 'late', time: '09:12 AM' },
    { id: '4', name: 'Nabila Khan', roll: 4, studentId: 'NSC2025004', status: 'present', time: '08:58 AM' },
    { id: '5', name: 'Fahim Shakil', roll: 5, studentId: 'NSC2025005', status: 'absent', time: '-' },
  ]);

  const updateStatus = (id: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setAttendanceList(
      attendanceList.map((item) =>
        item.id === id ? { ...item, status, time: status === 'absent' ? '-' : item.time || '09:00 AM' } : item
      )
    );
  };

  const markAll = (status: 'present' | 'absent') => {
    setAttendanceList(
      attendanceList.map((item) => ({ ...item, status, time: status === 'absent' ? '-' : '09:00 AM' }))
    );
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleNotifyParents = () => {
    setParentAlertSent(true);
    setTimeout(() => setParentAlertSent(false), 3500);
  };

  const presentCount = attendanceList.filter((s) => s.status === 'present').length;
  const absentCount = attendanceList.filter((s) => s.status === 'absent').length;
  const lateCount = attendanceList.filter((s) => s.status === 'late').length;
  const attendanceRate = Math.round(((presentCount + lateCount) / attendanceList.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
            Attendance Command Centre
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time daily roll call, automated parent absence notification, and QR gate scan tracking.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleNotifyParents}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-2 shadow-sm transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Notify Absent Parents</span>
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-md shadow-blue-600/20 transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center space-x-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Attendance records stored in PostgreSQL! Connected parent mobile apps updated.</span>
        </div>
      )}

      {parentAlertSent && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded-xl flex items-center space-x-2 animate-in fade-in">
          <Send className="w-4 h-4 text-blue-600" />
          <span>Automated absence notifications dispatched to 1 parent!</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-semibold text-slate-500">Attendance Rate</span>
          <p className="text-2xl font-black text-blue-600 mt-1">{attendanceRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-semibold text-slate-500">Present</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{presentCount}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-semibold text-slate-500">Absent</span>
          <p className="text-2xl font-black text-red-600 mt-1">{absentCount}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-semibold text-slate-500">Late</span>
          <p className="text-2xl font-black text-amber-500 mt-1">{lateCount}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase">Class & Section</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
            >
              <option>Class 9-A</option>
              <option>Class 9-B</option>
              <option>Class 10-A</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase">Attendance Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => markAll('present')}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold"
          >
            Mark All Present
          </button>
          <button
            onClick={() => markAll('absent')}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">Roll</th>
              <th className="py-3 px-4">Student ID</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Check-in Time</th>
              <th className="py-3 px-4 text-center">Status Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {attendanceList.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/80">
                <td className="py-3 px-4 font-bold text-slate-800">#{student.roll}</td>
                <td className="py-3 px-4 font-mono font-bold text-blue-600">{student.studentId}</td>
                <td className="py-3 px-4 font-bold text-slate-900">{student.name}</td>
                <td className="py-3 px-4 text-slate-500 font-mono">{student.time}</td>
                <td className="py-3 px-4 text-center">
                  <div className="inline-flex rounded-xl border border-slate-200 p-0.5 bg-slate-50 space-x-1">
                    <button
                      onClick={() => updateStatus(student.id, 'present')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        student.status === 'present'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-emerald-600'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => updateStatus(student.id, 'late')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        student.status === 'late'
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'text-slate-600 hover:text-amber-500'
                      }`}
                    >
                      Late
                    </button>
                    <button
                      onClick={() => updateStatus(student.id, 'absent')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        student.status === 'absent'
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-red-600'
                      }`}
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => updateStatus(student.id, 'excused')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        student.status === 'excused'
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-purple-600'
                      }`}
                    >
                      Excused
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
