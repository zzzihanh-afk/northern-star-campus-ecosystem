'use client';

import React, { useState } from 'react';
import {
  Award,
  FileSpreadsheet,
  CheckCircle,
  Eye,
  Download,
  Search,
  Filter,
  TrendingUp,
} from 'lucide-react';

export const ResultsView: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState('Term Final Exam 2025');
  const [isPublished, setIsPublished] = useState(true);
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);

  const resultsList = [
    {
      studentId: 'NSC2025001',
      name: 'Rahim Ahmed',
      class: 'Class 9-A',
      totalMarks: 294,
      gpa: 4.95,
      grade: 'A+',
      position: 1,
      math: 99,
      physics: 98,
      english: 97,
    },
    {
      studentId: 'NSC2025002',
      name: 'Sadia Islam',
      class: 'Class 9-A',
      totalMarks: 286,
      gpa: 4.85,
      grade: 'A+',
      position: 2,
      math: 95,
      physics: 96,
      english: 95,
    },
    {
      studentId: 'NSC2025003',
      name: 'Tahsin Alam',
      class: 'Class 10-A',
      totalMarks: 278,
      gpa: 4.70,
      grade: 'A',
      position: 3,
      math: 92,
      physics: 94,
      english: 92,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
              Academic Results, Transcripts & Merit Reports
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Automated GPA 5.0 calculation, class ranking standings, subject marks verification and official result publication.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setIsPublished(!isPublished);
              alert(
                !isPublished
                  ? 'Results published to Supabase! Students and parents can now view grades on mobile.'
                  : 'Results marked unpublished.'
              );
            }}
            className={`px-4 py-2 font-bold rounded-xl text-xs flex items-center space-x-2 transition-all ${
              isPublished
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isPublished ? 'Results Published' : 'Publish to Mobile'}</span>
          </button>
        </div>
      </div>

      {/* Exam Selector and Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Selected Assessment</span>
            <h4 className="text-sm font-black text-slate-900">{selectedExam}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Class Average GPA</span>
            <h4 className="text-sm font-black text-slate-900">4.83 / 5.00</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Pass Rate</span>
            <h4 className="text-sm font-black text-slate-900">100% Passed</h4>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900">Class 9-A Merit Standings</h3>
          <span className="text-xs font-semibold text-blue-600">Grading Scale: Standard GPA 5.0</span>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">Student ID</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Math (100)</th>
              <th className="py-3 px-4">Physics (100)</th>
              <th className="py-3 px-4">English (100)</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">GPA</th>
              <th className="py-3 px-4">Grade</th>
              <th className="py-3 px-4 text-right">Transcript</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {resultsList.map((res) => (
              <tr key={res.studentId} className="hover:bg-slate-50/80">
                <td className="py-3 px-4">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-black inline-flex items-center justify-center text-[11px]">
                    {res.position}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono font-bold text-blue-600">{res.studentId}</td>
                <td className="py-3 px-4 font-bold text-slate-900">{res.name}</td>
                <td className="py-3 px-4 font-mono font-medium">{res.math}</td>
                <td className="py-3 px-4 font-mono font-medium">{res.physics}</td>
                <td className="py-3 px-4 font-mono font-medium">{res.english}</td>
                <td className="py-3 px-4 font-bold text-slate-900">{res.totalMarks}</td>
                <td className="py-3 px-4 font-black text-blue-600">{res.gpa.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    {res.grade}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setShowTranscriptModal(true)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
                    title="View Academic Transcript"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Official Transcript Modal */}
      {showTranscriptModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="text-center pb-4 border-b border-slate-100">
              <span className="text-[11px] font-black text-amber-500 uppercase tracking-widest block">
                Official Report Card
              </span>
              <h3 className="text-lg font-black text-slate-900 font-sans">Northern Star School & College</h3>
              <p className="text-[11px] text-slate-500">Term Final Examination 2025 • Class 9-A</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs py-3 border-b border-slate-100">
              <div>
                <span className="text-slate-400">Student Name:</span>
                <p className="font-bold text-slate-900">Rahim Ahmed</p>
              </div>
              <div>
                <span className="text-slate-400">Student ID:</span>
                <p className="font-bold font-mono text-blue-600">NSC2025001</p>
              </div>
              <div>
                <span className="text-slate-400">Roll No:</span>
                <p className="font-bold text-slate-900">#1</p>
              </div>
              <div>
                <span className="text-slate-400">Merit Position:</span>
                <p className="font-bold text-emerald-600">1st (Distinction)</p>
              </div>
            </div>

            <div className="py-3 space-y-2">
              <div className="flex justify-between text-xs py-1 border-b border-slate-100 font-bold">
                <span>Subject</span>
                <span>Marks Obtained</span>
                <span>Letter Grade</span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span>Mathematics</span>
                <span className="font-mono font-bold">99 / 100</span>
                <span className="font-bold text-amber-600">A+</span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span>Physics</span>
                <span className="font-mono font-bold">98 / 100</span>
                <span className="font-bold text-amber-600">A+</span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span>English</span>
                <span className="font-mono font-bold">97 / 100</span>
                <span className="font-bold text-amber-600">A+</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl flex items-center justify-between mt-2">
              <span className="text-xs font-bold text-blue-900">Grade Point Average (GPA):</span>
              <span className="text-base font-black text-blue-700">4.95 / 5.00</span>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                onClick={() => setShowTranscriptModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Transcript exported as authenticated PDF.');
                  setShowTranscriptModal(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF Transcript</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
