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
  LogOut,
  Eye,
  EyeOff,
  UploadCloud,
  FileCheck,
} from 'lucide-react';
import { dataService } from '@/lib/data-service';
import { AppModule, AppConfiguration } from '@/lib/types';

interface SimUser {
  id: string;
  name: string;
  role: 'student' | 'parent' | 'teacher' | 'staff';
  idNumber: string;
  className: string;
  sectionName: string;
  avatar: string;
  department?: string;
  childName?: string;
}

interface HomeworkItem {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  className: string;
  dueDate: string;
  description: string;
  attachmentName?: string;
  status: 'pending' | 'submitted' | 'graded';
  submissionDate?: string;
  submissionNotes?: string;
  score?: string;
  teacherFeedback?: string;
}

const REGISTERED_ACCOUNTS: SimUser[] = [
  {
    id: 'st-001',
    name: 'Rahim Ahmed',
    role: 'student',
    idNumber: 'NSC2025001',
    className: 'Class 9',
    sectionName: 'A',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
  },
  {
    id: 'st-002',
    name: 'Sumaiya Akter',
    role: 'student',
    idNumber: 'NSC2025002',
    className: 'Class 10',
    sectionName: 'B',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
  },
  {
    id: 'st-003',
    name: 'Fahim Faysal',
    role: 'student',
    idNumber: 'NSC2025003',
    className: 'Class 11',
    sectionName: 'Science',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  },
  {
    id: 'tch-001',
    name: 'Tanvir Hasan',
    role: 'teacher',
    idNumber: 'TCH2025001',
    className: 'Classes 9 & 10',
    sectionName: 'A, B',
    department: 'Mathematics & Physics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    id: 'prn-001',
    name: 'Mrs. Fatema Akter',
    role: 'parent',
    idNumber: 'PRN2025001',
    className: 'Class 9',
    sectionName: 'A',
    childName: 'Rahim Ahmed (Class 9-A)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
  },
  {
    id: 'stf-001',
    name: 'Ms. Nusrat Jahan',
    role: 'staff',
    idNumber: 'STF2025001',
    className: 'All',
    sectionName: 'Main',
    department: 'Academic Administration',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  },
];

export const MobileSimulator: React.FC = () => {
  const [viewMode, setViewMode] = useState<'interactive-preview' | 'flutter-live'>('interactive-preview');

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<SimUser | null>(null);
  const [loginName, setLoginName] = useState<string>('');
  const [loginId, setLoginId] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [selectedRole, setSelectedRole] = useState<'student' | 'parent' | 'teacher' | 'staff'>('student');
  const [currentScreen, setCurrentScreen] = useState<
    'home' | 'attendance' | 'homework' | 'results' | 'fees' | 'library' | 'notifications' | 'digital-id'
  >('home');
  const [config, setConfig] = useState<AppConfiguration | null>(null);
  const [modules, setModules] = useState<AppModule[]>([]);
  const [librarySearch, setLibrarySearch] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'notices' | 'profile' | 'more'>('home');

  // Homework Module State
  const [homeworkFilter, setHomeworkFilter] = useState<'All' | 'Pending' | 'Submitted' | 'Graded'>('All');
  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>([
    {
      id: 'hw-1',
      title: 'Quadratic Equations Exercise 4.2',
      subject: 'Mathematics',
      teacher: 'Mr. Tanvir Hasan',
      className: 'Class 9-A',
      dueDate: 'Nov 17, 2026',
      description: 'Solve questions 1 through 15 on Page 88 of textbook. Show all derivation steps clearly and graph problems 7 & 12.',
      attachmentName: 'Math_Exercise_4.2_Worksheet.pdf',
      status: 'pending',
    },
    {
      id: 'hw-2',
      title: 'Newton\'s Third Law Lab Observation',
      subject: 'Physics',
      teacher: 'Dr. Farhad Hossain',
      className: 'Class 9-A',
      dueDate: 'Nov 18, 2026',
      description: 'Complete the reaction force table from Friday\'s laboratory session and calculate the percentage discrepancy for spring balances.',
      attachmentName: 'Lab_Report_Template_V2.pdf',
      status: 'pending',
    },
    {
      id: 'hw-3',
      title: 'Creative Essay: AI in Modern Education',
      subject: 'English',
      teacher: 'Ms. Nasreen Sultana',
      className: 'Class 9-A',
      dueDate: 'Nov 15, 2026',
      description: 'Write a 450-word analytical essay discussing the benefits and ethical considerations of AI tutors for secondary school students.',
      status: 'submitted',
      submissionDate: 'Nov 14, 2026, 8:45 PM',
      submissionNotes: 'Completed essay in 480 words. Bibliography and citations included.',
    },
    {
      id: 'hw-4',
      title: 'Python Functions & List Comprehensions',
      subject: 'ICT',
      teacher: 'Mr. Mahmudul Haque',
      className: 'Class 9-A',
      dueDate: 'Nov 10, 2026',
      description: 'Implement a program that filters prime numbers from an institutional roster array using list comprehension.',
      attachmentName: 'ICT_Coding_Assignment_3.py',
      status: 'graded',
      submissionDate: 'Nov 09, 2026, 6:30 PM',
      submissionNotes: 'All unit test cases passed with O(n) algorithmic complexity.',
      score: '96 / 100 (A+)',
      teacherFeedback: 'Outstanding logic, proper indentation, and clean variable naming conventions.',
    },
    {
      id: 'hw-5',
      title: 'Chemical Bonding & Lewis Dot Diagrams',
      subject: 'Chemistry',
      teacher: 'Dr. Farhad Hossain',
      className: 'Class 9-A',
      dueDate: 'Nov 20, 2026',
      description: 'Draw the electron valence dot diagrams for covalent compounds H2O, CH4, and NH3 with bond angle estimates.',
      attachmentName: 'Chemistry_Bonding_Guide.pdf',
      status: 'pending',
    },
  ]);

  // Homework submission modal state
  const [submittingHw, setSubmittingHw] = useState<HomeworkItem | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [hasAttachedFile, setHasAttachedFile] = useState(false);
  const [submissionAlert, setSubmissionAlert] = useState<string | null>(null);

  // Teacher create homework modal state
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [newHwTitle, setNewHwTitle] = useState('');
  const [newHwSubject, setNewHwSubject] = useState('Mathematics');
  const [newHwClass, setNewHwClass] = useState('Class 9-A');
  const [newHwDesc, setNewHwDesc] = useState('');

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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = loginName.trim();
    const trimmedId = loginId.trim();

    if (!trimmedName || !trimmedId) {
      setLoginError('Please enter both your Full Name and ID Number (Password).');
      return;
    }

    setLoginError(null);

    // Look up in registered accounts
    const match = REGISTERED_ACCOUNTS.find(
      (acc) =>
        acc.name.toLowerCase().replace(/\./g, '') === trimmedName.toLowerCase().replace(/\./g, '') ||
        acc.idNumber.toLowerCase() === trimmedId.toLowerCase()
    );

    if (match) {
      setCurrentUser(match);
      setSelectedRole(match.role);
      setIsLoggedIn(true);
      setCurrentScreen('home');
      return;
    }

    // Dynamic Fallback
    const upperId = trimmedId.toUpperCase();
    let detectedRole: 'student' | 'parent' | 'teacher' | 'staff' = 'student';
    let dept: string | undefined;

    if (upperId.startsWith('TCH') || upperId.includes('TEACH')) {
      detectedRole = 'teacher';
      dept = 'Faculty';
    } else if (upperId.startsWith('PRN') || upperId.includes('PARENT')) {
      detectedRole = 'parent';
    } else if (upperId.startsWith('STF') || upperId.includes('STAFF')) {
      detectedRole = 'staff';
      dept = 'Operations';
    }

    const dynamicUser: SimUser = {
      id: `usr-${Date.now()}`,
      name: trimmedName,
      role: detectedRole,
      idNumber: trimmedId,
      className: 'Class 9',
      sectionName: 'A',
      department: dept,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    };

    setCurrentUser(dynamicUser);
    setSelectedRole(detectedRole);
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleQuickFill = (name: string, id: string) => {
    setLoginName(name);
    setLoginId(id);
    setLoginError(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginName('');
    setLoginId('');
    setLoginError(null);
    setCurrentScreen('home');
  };

  const handleSubmitHomework = () => {
    if (!submittingHw) return;

    setHomeworkList((prev) =>
      prev.map((hw) => {
        if (hw.id === submittingHw.id) {
          return {
            ...hw,
            status: 'submitted',
            submissionDate: 'Today, 9:45 PM',
            submissionNotes: submissionNotes.trim() || 'Homework submitted on time with attached proof.',
          };
        }
        return hw;
      })
    );

    setSubmissionAlert(`"${submittingHw.title}" was submitted successfully!`);
    setTimeout(() => setSubmissionAlert(null), 3000);

    setSubmittingHw(null);
    setSubmissionNotes('');
    setHasAttachedFile(false);
  };

  const handleCreateHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHwTitle.trim()) return;

    const newHw: HomeworkItem = {
      id: `hw-${Date.now()}`,
      title: newHwTitle.trim(),
      subject: newHwSubject,
      teacher: currentUser?.name || 'Mr. Tanvir Hasan',
      className: newHwClass,
      dueDate: 'Due in 3 days',
      description: newHwDesc.trim() || 'Complete assigned textbook problems and show all derivation work.',
      status: 'pending',
    };

    setHomeworkList([newHw, ...homeworkList]);
    setShowAssignModal(false);
    setNewHwTitle('');
    setNewHwDesc('');
    setSubmissionAlert('New homework assigned to students!');
    setTimeout(() => setSubmissionAlert(null), 3000);
  };

  const filteredHomework = homeworkList.filter((item) => {
    if (homeworkFilter === 'All') return true;
    if (homeworkFilter === 'Pending') return item.status === 'pending';
    if (homeworkFilter === 'Submitted') return item.status === 'submitted';
    if (homeworkFilter === 'Graded') return item.status === 'graded';
    return true;
  });

  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-8 py-4">
      {/* Simulator Side Controls */}
      <div className="w-full xl:w-72 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Mobile Simulator Controls</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Test authentication, Homework assignment workflow, and all role experiences.
          </p>
        </div>

        {/* Engine Toggle */}
        <div className="bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1 px-1">
            Simulator Engine
          </label>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setViewMode('interactive-preview')}
              className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${
                viewMode === 'interactive-preview'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>📱 UI Mockup</span>
            </button>
            <button
              onClick={() => setViewMode('flutter-live')}
              className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${
                viewMode === 'flutter-live'
                  ? 'bg-[#0B1E38] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>⚡ Real Flutter</span>
            </button>
          </div>
        </div>

        {/* Active Session Card */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Session Status</span>
            <span
              className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                isLoggedIn ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isLoggedIn ? '● Authenticated' : '○ Login Required'}
            </span>
          </div>

          {isLoggedIn && currentUser ? (
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden relative border border-slate-300 shrink-0">
                  <Image src={currentUser.avatar} alt={currentUser.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-blue-600 font-semibold uppercase">{currentUser.role} • {currentUser.idNumber}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg border border-rose-200 flex items-center justify-center space-x-1 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch / Sign Out</span>
              </button>
            </div>
          ) : (
            <p className="text-[11px] text-slate-500 mt-1">
              Enter your Name and ID number (acts as password) on the phone screen to log in.
            </p>
          )}
        </div>

        {/* Jump to Sub-screen */}
        {isLoggedIn && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Jump to Module Sub-screen</label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setCurrentScreen('homework')}
                className={`p-2 text-xs font-bold rounded-lg border text-center transition-all ${
                  currentScreen === 'homework'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-200'
                }`}
              >
                📚 Homework
              </button>
              <button
                onClick={() => setCurrentScreen('attendance')}
                className={`p-2 text-xs font-medium rounded-lg border text-center ${
                  currentScreen === 'attendance'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                Attendance
              </button>
              <button
                onClick={() => setCurrentScreen('results')}
                className={`p-2 text-xs font-medium rounded-lg border text-center ${
                  currentScreen === 'results'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                Results (GPA)
              </button>
              <button
                onClick={() => setCurrentScreen('fees')}
                className={`p-2 text-xs font-medium rounded-lg border text-center ${
                  currentScreen === 'fees'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                Fee Status
              </button>
              <button
                onClick={() => setCurrentScreen('library')}
                className={`p-2 text-xs font-medium rounded-lg border text-center ${
                  currentScreen === 'library'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                Library
              </button>
              <button
                onClick={() => setCurrentScreen('digital-id')}
                className={`p-2 text-xs font-medium rounded-lg border text-center ${
                  currentScreen === 'digital-id'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                Digital ID Pass
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Realistic Mobile Phone Frame (380 x 800) */}
      <div className="relative w-[360px] sm:w-[380px] h-[780px] bg-slate-950 rounded-[48px] p-3 shadow-2xl ring-8 ring-slate-800/80 flex flex-col overflow-hidden select-none">
        {/* Notch / Speaker bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-3 border border-slate-800"></div>
        </div>

        {/* Mobile Screen Container */}
        <div className="w-full h-full bg-[#F4F6F9] rounded-[36px] overflow-hidden flex flex-col relative text-slate-800 font-sans">
          {viewMode === 'flutter-live' ? (
            <div className="w-full h-full pt-6 relative bg-white flex flex-col">
              <div className="px-4 py-1.5 flex items-center justify-between border-b border-slate-100 bg-slate-50 text-[10px] text-slate-500 font-medium z-10">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-bold text-slate-700">Flutter Web Runtime</span>
                </span>
                <span className="text-blue-600 font-bold text-[9px] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  Live WASM/Dart
                </span>
              </div>
              <iframe
                id="flutter-frame"
                src="/mobile-app/index.html"
                className="w-full flex-1 border-0"
                title="Flutter Mobile Application"
              />
            </div>
          ) : !isLoggedIn ? (
            /* ==============================================================
               MOBILE LOGIN SCREEN (No auto-account: requires Name & ID Number)
               ============================================================== */
            <div className="w-full h-full bg-[#081528] flex flex-col justify-between p-5 pt-8 overflow-y-auto animate-in fade-in">
              <div className="text-center mt-4">
                <div className="w-16 h-16 relative mx-auto mb-2">
                  <Image src="/logo.png" alt="Northern Star Emblem" fill className="object-contain" />
                </div>
                <h2 className="text-base font-black text-white tracking-wider">NORTHERN STAR</h2>
                <h3 className="text-xs font-extrabold text-amber-400">SCHOOL & COLLEGE</h3>
                <p className="text-[10px] text-slate-400 italic">Learn • Grow • Excel</p>
              </div>

              {/* Login Form Box */}
              <div className="bg-white rounded-2xl p-5 shadow-2xl my-3 border border-slate-100">
                <div className="mb-3">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">Campus Identity Access</h4>
                  <p className="text-[10px] text-slate-500">
                    Enter your name and ID number (acts as your password).
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={loginName}
                        onChange={(e) => setLoginName(e.target.value)}
                        placeholder="e.g. Rahim Ahmed"
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-1">
                      ID Number (Password)
                    </label>
                    <div className="relative">
                      <QrCode className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        placeholder="e.g. NSC2025001"
                        className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-[10px] text-rose-600 font-semibold flex items-center space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-blue-600/20 transition-all active:scale-95"
                  >
                    Enter Campus App
                  </button>
                </form>
              </div>

              {/* Quick Fill Demo Chips */}
              <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
                <span className="text-[10px] font-bold text-amber-300 block mb-1.5">
                  ⚡ Quick Demo Accounts (Tap to Auto-fill)
                </span>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('Rahim Ahmed', 'NSC2025001')}
                    className="px-2 py-1 bg-white/15 hover:bg-white/25 rounded text-[9px] font-bold text-white transition-all"
                  >
                    🎓 Rahim (NSC2025001)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('Sumaiya Akter', 'NSC2025002')}
                    className="px-2 py-1 bg-white/15 hover:bg-white/25 rounded text-[9px] font-bold text-white transition-all"
                  >
                    🎓 Sumaiya (NSC2025002)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('Tanvir Hasan', 'TCH2025001')}
                    className="px-2 py-1 bg-white/15 hover:bg-white/25 rounded text-[9px] font-bold text-white transition-all"
                  >
                    👨‍🏫 Tanvir (TCH2025001)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('Mrs. Fatema Akter', 'PRN2025001')}
                    className="px-2 py-1 bg-white/15 hover:bg-white/25 rounded text-[9px] font-bold text-white transition-all"
                  >
                    👥 Fatema (PRN2025001)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ==============================================================
               AUTHENTICATED MOBILE EXPERIENCE
               ============================================================== */
            <>
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
                    className="flex items-center text-xs font-bold text-blue-600 hover:text-blue-700"
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
                      <p className="text-[9px] text-slate-500 font-medium">
                        {currentUser?.name} • {currentUser?.idNumber}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setCurrentScreen('notifications')}
                    className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-full relative"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button
                    onClick={handleLogout}
                    title="Logout / Switch User"
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Submission Notification Toast */}
              {submissionAlert && (
                <div className="mx-3 mt-2 p-2.5 bg-emerald-600 text-white text-[11px] font-bold rounded-xl flex items-center space-x-2 shadow-md animate-in slide-in-from-top">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{submissionAlert}</span>
                </div>
              )}

              {/* MAIN SCROLLABLE CONTENT AREA */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
                {/* SUB-SCREEN: HOMEWORK (Full Interactive Module) */}
                {currentScreen === 'homework' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-slate-900">Homework & Assignments</h3>
                        <p className="text-[10px] text-slate-400">Class: {currentUser?.className || '9-A'}</p>
                      </div>
                      {currentUser?.role === 'teacher' && (
                        <button
                          onClick={() => setShowAssignModal(true)}
                          className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold shadow-sm"
                        >
                          + Assign Homework
                        </button>
                      )}
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex space-x-1 bg-white p-1 rounded-xl border border-slate-200 text-[10px] font-bold">
                      {(['All', 'Pending', 'Submitted', 'Graded'] as const).map((tab) => {
                        const count =
                          tab === 'All'
                            ? homeworkList.length
                            : homeworkList.filter((h) => h.status.toLowerCase() === tab.toLowerCase()).length;
                        return (
                          <button
                            key={tab}
                            onClick={() => setHomeworkFilter(tab)}
                            className={`flex-1 py-1 rounded-lg transition-all ${
                              homeworkFilter === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'
                            }`}
                          >
                            {tab} ({count})
                          </button>
                        );
                      })}
                    </div>

                    {/* Homework Cards */}
                    <div className="space-y-2.5">
                      {filteredHomework.map((hw) => {
                        const isPending = hw.status === 'pending';
                        const isSubmitted = hw.status === 'submitted';
                        const isGraded = hw.status === 'graded';

                        return (
                          <div
                            key={hw.id}
                            className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-50 text-blue-700">
                                {hw.subject}
                              </span>
                              <span
                                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                                  isPending
                                    ? 'bg-amber-100 text-amber-800'
                                    : isSubmitted
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {isPending ? 'Pending' : isSubmitted ? 'Submitted' : 'Graded'}
                              </span>
                            </div>

                            <h4 className="text-xs font-bold text-slate-900 leading-snug">{hw.title}</h4>
                            <p className="text-[11px] text-slate-500 line-clamp-2">{hw.description}</p>

                            {hw.attachmentName && (
                              <div className="flex items-center space-x-1.5 p-1.5 bg-slate-50 rounded-lg border border-slate-200 text-[10px] text-slate-600 font-medium">
                                <FileText className="w-3.5 h-3.5 text-rose-500" />
                                <span className="truncate">{hw.attachmentName}</span>
                              </div>
                            )}

                            {isSubmitted && hw.submissionDate && (
                              <div className="p-2 bg-blue-50/70 rounded-xl border border-blue-100 text-[10px] text-blue-900">
                                <p className="font-bold">✓ Submitted: {hw.submissionDate}</p>
                                {hw.submissionNotes && <p className="text-blue-700 mt-0.5">{hw.submissionNotes}</p>}
                              </div>
                            )}

                            {isGraded && hw.score && (
                              <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-[10px] text-emerald-900">
                                <div className="flex justify-between font-extrabold">
                                  <span>Teacher Grade:</span>
                                  <span className="text-emerald-700">{hw.score}</span>
                                </div>
                                {hw.teacherFeedback && (
                                  <p className="text-emerald-800 mt-0.5">{hw.teacherFeedback}</p>
                                )}
                              </div>
                            )}

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                              <div>
                                <span className="text-slate-400 block">{hw.teacher}</span>
                                <span className="text-rose-600 font-bold block">{hw.dueDate}</span>
                              </div>

                              {isPending ? (
                                <button
                                  onClick={() => setSubmittingHw(hw)}
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-[10px] shadow-sm shadow-blue-600/20 active:scale-95 transition-all"
                                >
                                  Submit Work
                                </button>
                              ) : (
                                <span className="text-[10px] font-semibold text-slate-400">
                                  {isSubmitted ? 'Under Evaluation' : 'Completed'}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SUB-SCREEN: ATTENDANCE */}
                {currentScreen === 'attendance' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex justify-between items-center bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold">
                      <button className="flex-1 py-1.5 bg-blue-600 text-white rounded-lg shadow-sm">Today</button>
                      <button className="flex-1 py-1.5 text-slate-500">Weekly</button>
                      <button className="flex-1 py-1.5 text-slate-500">Monthly</button>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center shadow-sm">
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
                  </div>
                )}

                {/* SUB-SCREEN: RESULTS */}
                {currentScreen === 'results' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
                      <span className="text-xs font-bold text-slate-500 block mb-1">Cumulative GPA</span>
                      <span className="text-4xl font-black text-blue-600">3.92</span>
                      <span className="text-[10px] text-emerald-600 font-extrabold block mt-1">Grade: A+ (Outstanding)</span>
                    </div>
                  </div>
                )}

                {/* SUB-SCREEN: FEES */}
                {currentScreen === 'fees' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-4 text-white shadow-md">
                      <span className="text-[10px] font-bold text-amber-100 uppercase tracking-wider block">Due Tuition</span>
                      <h3 className="text-2xl font-black mt-1">৳ 2,500</h3>
                      <p className="text-[10px] text-amber-100 mt-1">Due Date: Nov 25, 2026</p>
                    </div>
                  </div>
                )}

                {/* SUB-SCREEN: LIBRARY */}
                {currentScreen === 'library' && (
                  <div className="space-y-3 animate-in fade-in">
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
                    <div className="space-y-2">
                      {[
                        { title: 'Science Today', author: 'Dr. Farhad Hossain', category: 'Science' },
                        { title: 'Higher Mathematics Guide', author: 'Prof. Nazmul Haque', category: 'Mathematics' },
                        { title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Language' },
                      ].map((book, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{book.title}</h4>
                            <p className="text-[10px] text-slate-500">{book.author}</p>
                          </div>
                          <button
                            onClick={() => handleBorrow(book.title)}
                            disabled={borrowedBooks.includes(book.title)}
                            className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold"
                          >
                            {borrowedBooks.includes(book.title) ? 'Borrowed' : 'Borrow'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB-SCREEN: NOTIFICATIONS */}
                {currentScreen === 'notifications' && (
                  <div className="space-y-2.5 animate-in fade-in">
                    {[
                      { title: 'Homework Assigned', desc: 'Mathematics Exercise 4.2 assigned by Mr. Tanvir Hasan.' },
                      { title: 'Examination Routine', desc: 'Term examinations schedule released.' },
                      { title: 'Library Book Reminder', desc: 'Physics reference book due in 3 days.' },
                    ].map((n, i) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                        <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                        <p className="text-[11px] text-slate-500">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* SUB-SCREEN: DIGITAL ID PASS */}
                {currentScreen === 'digital-id' && (
                  <div className="bg-gradient-to-b from-[#0B1E38] via-[#103058] to-white rounded-3xl p-5 border border-slate-200 shadow-xl text-center text-white relative overflow-hidden animate-in fade-in">
                    <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-white shadow-lg relative my-2">
                      <Image
                        src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'}
                        alt="Photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-black text-slate-900 mt-2">{currentUser?.name}</h3>
                    <p className="text-xs font-bold text-blue-600">Class: {currentUser?.className || '9-A'}</p>
                    <p className="text-[11px] font-mono text-slate-500">ID: {currentUser?.idNumber}</p>
                    <div className="w-28 h-28 mx-auto bg-white p-2 rounded-2xl border-2 border-slate-200 my-3 shadow-sm flex items-center justify-center">
                      <QrCode className="w-24 h-24 text-slate-900" />
                    </div>
                  </div>
                )}

                {/* HOME DASHBOARD SCREEN */}
                {currentScreen === 'home' && (
                  <>
                    {/* Role Header Banner */}
                    <div
                      className={`rounded-2xl p-4 text-white shadow-md flex items-center space-x-3 ${
                        currentUser?.role === 'teacher'
                          ? 'bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500'
                          : currentUser?.role === 'parent'
                          ? 'bg-gradient-to-r from-purple-800 to-indigo-600'
                          : currentUser?.role === 'staff'
                          ? 'bg-gradient-to-r from-slate-800 to-slate-900'
                          : 'bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/80 relative shrink-0">
                        <Image
                          src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'}
                          alt={currentUser?.name || 'User'}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-black leading-tight">{currentUser?.name}</h3>
                        <p className="text-[11px] text-white/90 font-medium">
                          {currentUser?.role === 'teacher'
                            ? `Teacher (${currentUser?.department || 'Faculty'})`
                            : currentUser?.role === 'parent'
                            ? currentUser?.childName || 'Parent'
                            : currentUser?.role === 'staff'
                            ? `Staff (${currentUser?.department || 'Admin'})`
                            : `Class: ${currentUser?.className || '9'}-${currentUser?.sectionName || 'A'}`}
                        </p>
                        <p className="text-[10px] text-white/80 font-mono">ID: {currentUser?.idNumber}</p>
                      </div>
                    </div>

                    {/* Today's Classes */}
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
                      </div>
                    </div>

                    {/* Feature Grid with Working Homework Button */}
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

                      {/* HOMEWORK MODULE BUTTON */}
                      {isModuleActive('homework') && (
                        <button
                          onClick={() => setCurrentScreen('homework')}
                          className="p-3 bg-white hover:bg-blue-50/50 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-sm transition-all"
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

                      {isModuleActive('digital_id') && (
                        <button
                          onClick={() => setCurrentScreen('digital-id')}
                          className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-sm"
                        >
                          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-1">
                            <QrCode className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-800">Digital ID</span>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Navigation */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 flex items-center justify-between text-[10px] font-semibold text-slate-400 z-30">
                <button
                  onClick={() => setCurrentScreen('home')}
                  className={`flex flex-col items-center space-y-0.5 ${currentScreen === 'home' ? 'text-blue-600' : ''}`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => setCurrentScreen('homework')}
                  className={`flex flex-col items-center space-y-0.5 ${currentScreen === 'homework' ? 'text-blue-600' : ''}`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Homework</span>
                </button>
                <button
                  onClick={() => setCurrentScreen('digital-id')}
                  className={`flex flex-col items-center space-y-0.5 ${currentScreen === 'digital-id' ? 'text-blue-600' : ''}`}
                >
                  <User className="w-4 h-4" />
                  <span>ID Pass</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center space-y-0.5 text-rose-500 hover:text-rose-700"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Exit</span>
                </button>
              </div>

              {/* MODAL: SUBMIT HOMEWORK */}
              {submittingHw && (
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-end">
                  <div className="w-full bg-white rounded-t-3xl p-4 space-y-3 animate-in slide-in-from-bottom max-h-[85%] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Submit Homework</h4>
                        <p className="text-[10px] text-blue-600 font-semibold">{submittingHw.subject} • {submittingHw.title}</p>
                      </div>
                      <button onClick={() => setSubmittingHw(null)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-1">
                        Submission Notes / Written Answers
                      </label>
                      <textarea
                        rows={3}
                        value={submissionNotes}
                        onChange={(e) => setSubmissionNotes(e.target.value)}
                        placeholder="Type assignment solution summary or comments for your teacher..."
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Simulated Attachment Box */}
                    <button
                      type="button"
                      onClick={() => setHasAttachedFile(!hasAttachedFile)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center space-x-2 transition-all ${
                        hasAttachedFile
                          ? 'bg-blue-50 border-blue-400 text-blue-900'
                          : 'bg-slate-50 border-dashed border-slate-300 text-slate-600'
                      }`}
                    >
                      {hasAttachedFile ? (
                        <>
                          <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="text-[11px] font-bold truncate">Handwritten_Solution_Worksheet.pdf attached</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="text-[11px] font-medium">Attach Solution Photo or PDF</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleSubmitHomework}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all"
                    >
                      Turn In Assignment
                    </button>
                  </div>
                </div>
              )}

              {/* MODAL: TEACHER ASSIGN HOMEWORK */}
              {showAssignModal && (
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-end">
                  <form
                    onSubmit={handleCreateHomework}
                    className="w-full bg-white rounded-t-3xl p-4 space-y-3 animate-in slide-in-from-bottom max-h-[85%] overflow-y-auto"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <h4 className="text-xs font-bold text-slate-900">Assign New Homework</h4>
                      <button type="button" onClick={() => setShowAssignModal(false)} className="text-slate-400">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-1">Homework Title</label>
                      <input
                        type="text"
                        required
                        value={newHwTitle}
                        onChange={(e) => setNewHwTitle(e.target.value)}
                        placeholder="e.g. Chapter 4 Practice Exercises"
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1">Subject</label>
                        <select
                          value={newHwSubject}
                          onChange={(e) => setNewHwSubject(e.target.value)}
                          className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                        >
                          <option value="Mathematics">Mathematics</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="English">English</option>
                          <option value="ICT">ICT</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1">Class</label>
                        <input
                          type="text"
                          value={newHwClass}
                          onChange={(e) => setNewHwClass(e.target.value)}
                          className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-1">Instructions / Description</label>
                      <textarea
                        rows={2}
                        value={newHwDesc}
                        onChange={(e) => setNewHwDesc(e.target.value)}
                        placeholder="Problem numbers, reference pages, or instructions..."
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-blue-600 text-white font-extrabold rounded-xl text-xs"
                    >
                      Publish Homework
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
