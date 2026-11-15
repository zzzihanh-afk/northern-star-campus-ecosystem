'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Bell,
  CheckCircle2,
  CalendarCheck,
  BookOpen,
  Award,
  CreditCard,
  Clock,
  Book,
  QrCode,
  Users,
  ChevronRight,
  Search,
  Check,
  Download,
  AlertCircle,
  Home,
  MessageSquare,
  Grid,
  User,
  CheckSquare,
  FileText,
  Calendar,
  Settings,
  ShieldAlert,
  ArrowLeft,
  X,
} from 'lucide-react';
import { dataService } from '@/lib/data-service';
import { AppModule, AppConfiguration } from '@/lib/types';

export const MobileSimulator: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'parent' | 'teacher' | 'staff'>('student');
  const [currentScreen, setCurrentScreen] = useState<'home' | 'attendance' | 'results' | 'fees' | 'library' | 'notifications' | 'digital-id'>('home');
  const [config, setConfig] = useState<AppConfiguration | null>(null);
  const [modules, setModules] = useState<AppModule[]>([]);
  const [librarySearch, setLibrarySearch] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'notices' | 'profile' | 'more'>('home');

  useEffect(() => {
    const fetchData = async () => {
      const c = await dataService.getAppConfiguration();
      const m = await dataService.getAppModules();
      setConfig(c);
      setModules(m);
    };
    fetchData();
  }, []);

  const isModuleActive = (key: string) => {
    const mod = modules.find((m) => m.module_key === key);
    return mod ? mod.is_enabled : true;
  };

  const handleBorrow = (title: string) => {
    if (!borrowedBooks.includes(title)) {
      setBorrowedBooks([...borrowedBooks, title]);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-8 py-4">
      {/* Role Selector Controls */}
      <div className="w-full xl:w-72 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Mobile Simulator Controls</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Test all four role experiences and verified sub-screens matching the official mobile showcase.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Switch Role Experience</label>
          <div className="space-y-1.5">
            {[
              { id: 'student', label: 'Student Portal (Rahim Ahmed)', icon: '🎓' },
              { id: 'parent', label: 'Parent Portal (Mrs. Fatema Akter)', icon: '👥' },
              { id: 'teacher', label: 'Teacher Portal (Mr. Tanvir Hasan)', icon: '👨‍🏫' },
              { id: 'staff', label: 'Staff Portal (Ms. Nusrat Jahan)', icon: '💼' },
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id as any);
                  setCurrentScreen('home');
                }}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  selectedRole === role.id
                    ? 'bg-[#0B1E38] text-white shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span className="text-base">{role.icon}</span>
                <span className="truncate">{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Jump to Sub-screen</label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setCurrentScreen('attendance')}
              className={`p-2 text-xs font-medium rounded-lg border text-center ${
                currentScreen === 'attendance' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              Attendance
            </button>
            <button
              onClick={() => setCurrentScreen('results')}
              className={`p-2 text-xs font-medium rounded-lg border text-center ${
                currentScreen === 'results' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              Results (GPA)
            </button>
            <button
              onClick={() => setCurrentScreen('fees')}
              className={`p-2 text-xs font-medium rounded-lg border text-center ${
                currentScreen === 'fees' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              Fee Status
            </button>
            <button
              onClick={() => setCurrentScreen('library')}
              className={`p-2 text-xs font-medium rounded-lg border text-center ${
                currentScreen === 'library' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              Library
            </button>
            <button
              onClick={() => setCurrentScreen('notifications')}
              className={`p-2 text-xs font-medium rounded-lg border text-center ${
                currentScreen === 'notifications' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setCurrentScreen('digital-id')}
              className={`p-2 text-xs font-medium rounded-lg border text-center ${
                currentScreen === 'digital-id' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              Digital ID Card
            </button>
          </div>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900">
          <p className="font-bold flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-blue-600" />
            Live Remote Sync
          </p>
          <p className="text-[11px] text-blue-700 mt-1">
            Toggle modules in <strong>Mobile App Management</strong> to watch them appear/disappear here instantly.
          </p>
        </div>
      </div>

      {/* The Realistic Mobile Phone Frame (390 x 800) */}
      <div className="relative w-[360px] sm:w-[380px] h-[780px] bg-slate-950 rounded-[48px] p-3 shadow-2xl ring-8 ring-slate-800/80 flex flex-col overflow-hidden select-none">
        {/* Notch / Speaker bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-3 border border-slate-800"></div>
        </div>

        {/* Mobile Screen Container */}
        <div className="w-full h-full bg-[#F4F6F9] rounded-[36px] overflow-hidden flex flex-col relative text-slate-800 font-sans">
          {/* Top Status Bar */}
          <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-bold text-slate-600 z-40 bg-transparent">
            <span>9:41</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-[9px]">5G</span>
              <div className="w-4 h-2.5 border border-slate-600 rounded-sm p-0.5 flex items-center">
                <div className="w-full h-full bg-slate-700 rounded-2xs"></div>
              </div>
            </div>
          </div>

          {/* Top App Header */}
          <div className="px-4 py-2 flex items-center justify-between border-b border-slate-200/60 bg-white z-30">
            {currentScreen !== 'home' ? (
              <button
                onClick={() => setCurrentScreen('home')}
                className="flex items-center text-xs font-bold text-blue-600"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 relative flex-shrink-0">
                  <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-slate-900 tracking-tight leading-none uppercase">
                    Northern Star
                  </h4>
                  <p className="text-[9px] text-slate-500 font-medium">School & College</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setCurrentScreen('notifications')}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-full relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Maintenance Mode Overlay */}
          {config?.maintenance_mode && (
            <div className="absolute inset-0 bg-[#0B1E38]/95 z-50 flex flex-col items-center justify-center p-6 text-center text-white animate-in fade-in">
              <ShieldAlert className="w-14 h-14 text-amber-400 mb-3 animate-bounce" />
              <h3 className="text-base font-extrabold text-white mb-2 font-sans">
                Maintenance In Progress
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed mb-4">
                {config.maintenance_message}
              </p>
              <span className="text-[10px] text-amber-300 font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                Authorized Admin Emergency Bypass
              </span>
            </div>
          )}

          {/* MAIN SCROLLABLE CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
            {/* SUB-SCREEN 1: ATTENDANCE */}
            {currentScreen === 'attendance' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex justify-between items-center bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold">
                  <button className="flex-1 py-1.5 bg-blue-600 text-white rounded-lg shadow-sm">Today</button>
                  <button className="flex-1 py-1.5 text-slate-500">Weekly</button>
                  <button className="flex-1 py-1.5 text-slate-500">Monthly</button>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center shadow-sm">
                  {/* Circular Gauge 96% Present */}
                  <div className="relative w-32 h-32 mx-auto flex items-center justify-center my-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="50" stroke="#F1F5F9" strokeWidth="12" fill="transparent" />
                      <circle
                        cx="64"
                        cy="64"
                        r="50"
                        stroke="#10B981"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray="314.15"
                        strokeDashoffset="12.56"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-2xl font-black text-slate-900">96%</span>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">Present</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 text-center border-t border-slate-100 pt-3">
                    <div>
                      <span className="block text-sm font-extrabold text-slate-900">1,200</span>
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span> Present
                      </span>
                    </div>
                    <div>
                      <span className="block text-sm font-extrabold text-slate-900">50</span>
                      <span className="text-[10px] font-bold text-red-500 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></span> Absent
                      </span>
                    </div>
                    <div>
                      <span className="block text-sm font-extrabold text-slate-900">20</span>
                      <span className="text-[10px] font-bold text-amber-500 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1"></span> Late
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mon - Fri Bar Attendance Chart */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 mb-3">Weekly Attendance Graph</h4>
                  <div className="flex items-end justify-between h-28 pt-4 px-2 border-b border-slate-100 pb-2">
                    {[
                      { day: 'Mon', height: '90%' },
                      { day: 'Tue', height: '96%' },
                      { day: 'Wed', height: '94%' },
                      { day: 'Thu', height: '88%' },
                      { day: 'Fri', height: '98%' },
                    ].map((bar, i) => (
                      <div key={i} className="flex flex-col items-center space-y-1.5">
                        <div
                          className="w-8 bg-blue-500 rounded-t-md transition-all shadow-sm"
                          style={{ height: bar.height }}
                        ></div>
                        <span className="text-[10px] font-bold text-slate-500">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-SCREEN 2: RESULTS */}
            {currentScreen === 'results' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[11px] font-bold rounded-full mb-3 border border-blue-200">
                    Term Final Exam 2025
                  </div>

                  <div className="w-16 h-16 mx-auto bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-center justify-center shadow-inner mb-2">
                    <span className="text-3xl font-black text-amber-600">A+</span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900">GPA: 4.95</h3>
                  <p className="text-xs text-slate-500 font-medium">Position: 1st in Class 9-A</p>

                  <button
                    onClick={() => alert('Official Verified Academic Transcript - Northern Star School & College\nStudent: Rahim Ahmed (ID: NSC2025001)\nOverall Result: Passed with Distinction (GPA 4.95)')}
                    className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                  >
                    View Full Result Transcript
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-900 mb-2">Subject Marks</h4>
                  {[
                    { subject: 'Mathematics', mark: 99, grade: 'A+' },
                    { subject: 'Physics', mark: 98, grade: 'A+' },
                    { subject: 'English', mark: 97, grade: 'A+' },
                  ].map((sub, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs">
                      <span className="font-bold text-slate-800">{sub.subject}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-slate-900">{sub.mark} / 100</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {sub.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-SCREEN 3: FEE STATUS */}
            {currentScreen === 'fees' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
                  <div className="w-12 h-12 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Paid in Full</h3>
                  <span className="text-2xl font-black text-emerald-600">৳ 5,000</span>
                  <p className="text-[11px] text-slate-400 mt-1">November Tuition Fee Cleared</p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-900">Payment History</h4>
                    <span className="text-[10px] text-blue-600 font-bold">View All</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { month: 'Nov 2025', id: 'REC-11001', amount: '৳ 5,000', status: 'Paid' },
                      { month: 'Oct 2025', id: 'REC-10045', amount: '৳ 5,000', status: 'Paid' },
                      { month: 'Sep 2025', id: 'REC-09022', amount: '৳ 5,000', status: 'Paid' },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs">
                        <div>
                          <p className="font-bold text-slate-900">{p.month}</p>
                          <span className="text-[10px] text-slate-400">{p.id}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">{p.amount}</p>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            {p.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => alert('Online fee gateway interface ready: bKash, Nagad, Card.')}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
                >
                  Pay Online
                </button>
              </div>
            )}

            {/* SUB-SCREEN 4: LIBRARY */}
            {currentScreen === 'library' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    placeholder="Search books..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm">
                    All Books
                  </button>
                  <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium">
                    My Books ({borrowedBooks.length})
                  </button>
                </div>

                <div className="space-y-2.5">
                  {[
                    { title: 'Science Today', author: 'Dr. Farhad Hossain', category: 'Educational', cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100' },
                    { title: 'Mathematics Guide', author: 'Prof. Nazmul Haque', category: 'Educational', cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=100' },
                    { title: 'English Grammar', author: 'Raymond Murphy', category: 'Language', cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=100' },
                  ]
                    .filter((b) => b.title.toLowerCase().includes(librarySearch.toLowerCase()))
                    .map((book, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-11 h-14 relative rounded-md overflow-hidden bg-slate-100 shrink-0">
                            <Image src={book.cover} alt={book.title} fill className="object-cover" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 leading-tight">{book.title}</h4>
                            <span className="text-[10px] text-blue-600 font-semibold">{book.category}</span>
                            <p className="text-[10px] text-slate-400">{book.author}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleBorrow(book.title)}
                          disabled={borrowedBooks.includes(book.title)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                            borrowedBooks.includes(book.title)
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                          }`}
                        >
                          {borrowedBooks.includes(book.title) ? 'Borrowed' : 'Borrow'}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* SUB-SCREEN 5: NOTIFICATIONS */}
            {currentScreen === 'notifications' && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex space-x-2 border-b border-slate-200 pb-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm">All</button>
                  <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg">Unread (2)</button>
                </div>

                {[
                  { title: 'Exam Schedule', desc: 'Annual Exam routine released.', date: 'Nov 15, 2025', icon: Award, color: 'text-purple-600 bg-purple-50' },
                  { title: 'Fee Reminder', desc: 'Tuition receipt confirmed.', date: 'Nov 20, 2025', icon: CreditCard, color: 'text-emerald-600 bg-emerald-50' },
                  { title: 'Sports Day', desc: 'Event details published.', date: 'Nov 25, 2025', icon: Bell, color: 'text-blue-600 bg-blue-50' },
                  { title: 'New Library Books', desc: 'Check science section.', date: 'Nov 10, 2025', icon: Book, color: 'text-amber-600 bg-amber-50' },
                ].map((n, i) => {
                  const Icon = n.icon;
                  return (
                    <div key={i} className="flex items-start space-x-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <div className={`p-2 rounded-xl ${n.color} shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                        <p className="text-[11px] text-slate-500">{n.desc}</p>
                        <span className="text-[9px] text-slate-400 mt-1 block">{n.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SUB-SCREEN 6: DIGITAL ID CARD (Matches Reference 3) */}
            {currentScreen === 'digital-id' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="bg-gradient-to-b from-[#0B1E38] via-[#103058] to-white rounded-3xl p-5 border border-slate-200 shadow-xl text-center text-white relative overflow-hidden">
                  {/* Card Header Logo */}
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <div className="w-8 h-8 relative">
                      <Image src="/logo.png" alt="Emblem" fill className="object-contain" />
                    </div>
                    <div className="text-left">
                      <span className="text-[11px] font-black tracking-wider uppercase block text-white">
                        Northern Star
                      </span>
                      <span className="text-[8px] text-amber-300 font-semibold block -mt-0.5">
                        School & College
                      </span>
                    </div>
                  </div>

                  {/* Student Photo */}
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-white shadow-lg relative my-2">
                    <Image
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"
                      alt="Rahim Ahmed"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Student Details */}
                  <h3 className="text-base font-black text-slate-900 mt-2">Rahim Ahmed</h3>
                  <p className="text-xs font-bold text-blue-600">Class: 9-A</p>
                  <p className="text-[11px] font-mono text-slate-500">ID: NSC2025001</p>

                  {/* High Contrast Verifiable QR Code */}
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-2xl border-2 border-slate-200 my-4 shadow-sm flex items-center justify-center">
                    <QrCode className="w-28 h-28 text-slate-900" />
                  </div>

                  <span className="text-[9px] text-slate-400 block mb-1">
                    Valid for Academic Year 2025-2026
                  </span>

                  <button
                    onClick={() => alert('Digital ID Token NSC2025001 verified & downloaded.')}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download ID Pass</span>
                  </button>
                </div>
              </div>
            )}

            {/* HOME SCREEN FOR SELECTED ROLE */}
            {currentScreen === 'home' && (
              <>
                {/* 1. STUDENT PORTAL EXPERIENCE */}
                {selectedRole === 'student' && (
                  <div className="space-y-4">
                    {/* Blue gradient student card */}
                    <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 rounded-2xl p-4 text-white shadow-md flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/80 relative shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"
                          alt="Rahim Ahmed"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-black leading-tight">Rahim Ahmed</h3>
                        <p className="text-[11px] text-blue-100 font-medium">Class: 9-A</p>
                        <p className="text-[10px] text-blue-200 font-mono">ID: NSC2025001</p>
                      </div>
                    </div>

                    {/* Today's Classes List */}
                    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
                      <div className="flex items-center justify-between mb-2.5">
                        <h4 className="text-xs font-bold text-slate-900">Today&apos;s Classes</h4>
                        <span className="text-[10px] text-blue-600 font-bold">View All →</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2.5 text-xs p-2 rounded-xl bg-slate-50">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 truncate">Mathematics</p>
                            <span className="text-[10px] text-slate-400">Room 101 • 9:00 AM</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2.5 text-xs p-2 rounded-xl bg-slate-50">
                          <div className="w-4 h-4 rounded-full border-2 border-blue-500 shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 truncate">Physics</p>
                            <span className="text-[10px] text-slate-400">Room 102 • 10:00 AM</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2.5 text-xs p-2 rounded-xl bg-slate-50">
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 truncate">English</p>
                            <span className="text-[10px] text-slate-400">Room 103 • 11:00 AM</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 6 Feature Action Grid (Filtered by Super Admin Module Config!) */}
                    <div className="grid grid-cols-3 gap-2">
                      {isModuleActive('attendance') && (
                        <button
                          onClick={() => setCurrentScreen('attendance')}
                          className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-sm"
                        >
                          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                            <CalendarCheck className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-800">Attendance</span>
                        </button>
                      )}

                      {isModuleActive('homework') && (
                        <button
                          onClick={() => alert('Homework: Mathematics Exercise 4.2 due tomorrow.')}
                          className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-sm"
                        >
                          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-800">Homework</span>
                        </button>
                      )}

                      {isModuleActive('results') && (
                        <button
                          onClick={() => setCurrentScreen('results')}
                          className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-sm"
                        >
                          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1">
                            <Award className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-800">Results</span>
                        </button>
                      )}

                      {isModuleActive('routine') && (
                        <button
                          onClick={() => alert('Weekly Routine: Mon-Thu 8:30 AM - 1:30 PM')}
                          className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-sm"
                        >
                          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
                            <Clock className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-800">Routine</span>
                        </button>
                      )}

                      {isModuleActive('fees') && (
                        <button
                          onClick={() => setCurrentScreen('fees')}
                          className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-sm"
                        >
                          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-1">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-800">Fee Status</span>
                        </button>
                      )}

                      {isModuleActive('library') && (
                        <button
                          onClick={() => setCurrentScreen('library')}
                          className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-sm"
                        >
                          <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-1">
                            <Book className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-800">Library</span>
                        </button>
                      )}
                    </div>

                    {/* Quick Access Digital ID Banner */}
                    {isModuleActive('digital_id') && (
                      <button
                        onClick={() => setCurrentScreen('digital-id')}
                        className="w-full p-3 bg-gradient-to-r from-[#0B1E38] to-[#1D4ED8] text-white rounded-2xl flex items-center justify-between shadow-sm"
                      >
                        <div className="flex items-center space-x-3">
                          <QrCode className="w-6 h-6 text-amber-400" />
                          <div className="text-left">
                            <h4 className="text-xs font-bold">My Digital Student ID</h4>
                            <span className="text-[10px] text-blue-200">Tap to view pass & QR</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>
                )}

                {/* 2. PARENT PORTAL EXPERIENCE (Mrs. Fatema Akter) */}
                {selectedRole === 'parent' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-700 to-indigo-600 rounded-2xl p-4 text-white shadow-md flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/80 relative shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
                          alt="Mrs. Fatema Akter"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-black leading-tight">Mrs. Fatema Akter</h3>
                        <p className="text-[11px] text-purple-100 font-medium">Parent of Rahim Ahmed (9-A)</p>
                      </div>
                    </div>

                    {/* Live Student Check-in status */}
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-950">Your child is present today</p>
                        <span className="text-[10px] text-emerald-700">9:00 AM • Mathematics (Room 101)</span>
                      </div>
                    </div>

                    {/* Child Overview 4-grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div
                        onClick={() => setCurrentScreen('attendance')}
                        className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm cursor-pointer"
                      >
                        <span className="text-[10px] text-slate-500 font-medium">Attendance</span>
                        <p className="text-lg font-black text-emerald-600">96%</p>
                      </div>
                      <div
                        onClick={() => setCurrentScreen('results')}
                        className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm cursor-pointer"
                      >
                        <span className="text-[10px] text-slate-500 font-medium">Results</span>
                        <p className="text-lg font-black text-blue-600">A+</p>
                      </div>
                      <div
                        onClick={() => setCurrentScreen('fees')}
                        className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm cursor-pointer"
                      >
                        <span className="text-[10px] text-slate-500 font-medium">Fee Status</span>
                        <p className="text-lg font-black text-emerald-600">Paid</p>
                      </div>
                      <div
                        onClick={() => setCurrentScreen('notifications')}
                        className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm cursor-pointer"
                      >
                        <span className="text-[10px] text-slate-500 font-medium">Notices</span>
                        <p className="text-lg font-black text-amber-500">3</p>
                      </div>
                    </div>

                    {/* Recent Updates */}
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-bold text-slate-900 mb-1">Recent Updates</h4>
                      <div className="p-2.5 bg-slate-50 rounded-xl text-xs">
                        <p className="font-bold text-slate-800">Parent-Teacher Meeting</p>
                        <span className="text-[10px] text-slate-400">Tomorrow at 10:00 AM</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. TEACHER PORTAL EXPERIENCE (Mr. Tanvir Hasan) */}
                {selectedRole === 'teacher' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-emerald-700 to-teal-600 rounded-2xl p-4 text-white shadow-md flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/80 relative shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                          alt="Mr. Tanvir Hasan"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-black leading-tight">Mr. Tanvir Hasan</h3>
                        <p className="text-[11px] text-emerald-100 font-medium">Teacher (Mathematics)</p>
                      </div>
                    </div>

                    {/* Quick actions for teacher */}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => alert('Class 9-A attendance sheet launched for Mr. Tanvir Hasan')}
                        className="p-3 bg-white rounded-2xl border border-slate-200 text-center shadow-sm"
                      >
                        <CalendarCheck className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
                        <span className="text-[10px] font-bold text-slate-800">Take Attendance</span>
                      </button>
                      <button
                        onClick={() => alert('Homework upload modal launched')}
                        className="p-3 bg-white rounded-2xl border border-slate-200 text-center shadow-sm"
                      >
                        <BookOpen className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                        <span className="text-[10px] font-bold text-slate-800">Upload Homework</span>
                      </button>
                      <button
                        onClick={() => alert('Marks grading entry sheet launched')}
                        className="p-3 bg-white rounded-2xl border border-slate-200 text-center shadow-sm"
                      >
                        <Award className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                        <span className="text-[10px] font-bold text-slate-800">Enter Marks</span>
                      </button>
                    </div>

                    {/* Today's Teaching Schedule */}
                    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-bold text-slate-900 mb-2">Today&apos;s Classes</h4>
                      <div className="p-3 bg-blue-50 rounded-xl flex items-center justify-between border border-blue-100">
                        <div>
                          <p className="text-xs font-bold text-slate-900">Mathematics</p>
                          <span className="text-[10px] text-slate-500">Class: 9-A • 9:00 AM - 10:00 AM</span>
                        </div>
                        <button
                          onClick={() => alert('Classroom session initiated for Class 9-A')}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold"
                        >
                          Join
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. STAFF PORTAL EXPERIENCE (Ms. Nusrat Jahan) */}
                {selectedRole === 'staff' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-4 text-white shadow-md flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/80 relative shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
                          alt="Ms. Nusrat Jahan"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-black leading-tight">Ms. Nusrat Jahan</h3>
                        <p className="text-[11px] text-slate-300 font-medium">Staff (Administration)</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button className="p-3 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
                        <CalendarCheck className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                        <span className="text-[10px] font-bold text-slate-800">Attendance</span>
                      </button>
                      <button className="p-3 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
                        <FileText className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                        <span className="text-[10px] font-bold text-slate-800">Leave Request</span>
                      </button>
                      <button className="p-3 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
                        <Bell className="w-5 h-5 mx-auto text-purple-600 mb-1" />
                        <span className="text-[10px] font-bold text-slate-800">Notices</span>
                      </button>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-bold text-slate-900 mb-1">Quick Info</h4>
                      <p className="text-[11px] text-slate-500">Next Event: Annual Sports Day (Nov 25, 2025)</p>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-xs font-semibold">
                        <span>Department</span>
                        <span className="text-blue-600 font-bold">Administration &gt;</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bottom App Navigation Bar (Matches official role navigation) */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 flex items-center justify-between text-[10px] font-semibold text-slate-400 z-30">
            <button
              onClick={() => {
                setCurrentScreen('home');
                setActiveTab('home');
              }}
              className={`flex flex-col items-center space-y-0.5 ${
                activeTab === 'home' && currentScreen === 'home' ? 'text-blue-600' : ''
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                setCurrentScreen('notifications');
                setActiveTab('notices');
              }}
              className={`flex flex-col items-center space-y-0.5 ${
                currentScreen === 'notifications' ? 'text-blue-600' : ''
              }`}
            >
              {selectedRole === 'parent' || selectedRole === 'teacher' ? (
                <>
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                </>
              ) : selectedRole === 'staff' ? (
                <>
                  <CheckSquare className="w-4 h-4" />
                  <span>Tasks</span>
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  <span>Notices</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setCurrentScreen('digital-id');
                setActiveTab('profile');
              }}
              className={`flex flex-col items-center space-y-0.5 ${
                currentScreen === 'digital-id' ? 'text-blue-600' : ''
              }`}
            >
              <User className="w-4 h-4" />
              <span>{selectedRole === 'student' ? 'ID Card' : 'Profile'}</span>
            </button>

            <button
              onClick={() => {
                setCurrentScreen('library');
                setActiveTab('more');
              }}
              className={`flex flex-col items-center space-y-0.5 ${
                currentScreen === 'library' ? 'text-blue-600' : ''
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>More</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
