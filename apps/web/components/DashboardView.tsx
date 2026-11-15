'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Users,
  CalendarCheck,
  Bus,
  CreditCard,
  PlusCircle,
  Bell,
  CheckCircle,
  FileText,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { DashboardStats } from '@/lib/types';

interface DashboardViewProps {
  stats: DashboardStats;
  onNavigate: (module: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ stats, onNavigate }) => {
  const [chartRange, setChartRange] = useState('This Month');

  return (
    <div className="space-y-6">
      {/* 1. WELCOME HERO BANNER (Matches Reference Image Exactly) */}
      <div className="relative rounded-2xl overflow-hidden shadow-card border border-blue-900/30 bg-gradient-to-r from-[#0B2545] via-[#134074] to-[#1D4ED8] p-6 lg:p-8 text-white min-h-[170px] flex flex-col justify-center">
        {/* Subtle background architectural overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none overflow-hidden">
          <Image
            src="/dashboard-ref.png"
            alt="Northern Star Campus"
            fill
            className="object-cover object-right"
          />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Welcome to Northern Star School & College</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">
            Building a Smart Campus for a Brighter Future
          </h1>
          <p className="text-xs lg:text-sm text-blue-100 max-w-lg mb-4 font-light">
            Unified digital ecosystem powering high school and college administration, academics, automated operations, and connected mobile portals.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => onNavigate('mobile-control')}
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              <span>View Campus Overview</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('mobile-preview')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs flex items-center space-x-1.5 backdrop-blur-md border border-white/20 transition-all"
            >
              <span>Launch Mobile Portals</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Script Logo Watermark / Calligraphy */}
        <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 text-right pointer-events-none select-none">
          <p className="text-3xl font-serif italic text-amber-400 font-light tracking-wide opacity-90 drop-shadow-md">
            Learn Grow
          </p>
          <p className="text-4xl font-serif italic text-white font-bold tracking-widest drop-shadow-lg -mt-1">
            Excel
          </p>
        </div>
      </div>

      {/* 2. STAT SUMMARY CARDS WITH CURVE WAVE GRAPHICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Students */}
        <div className="relative overflow-hidden bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between mb-2">
            <div className="w-11 h-11 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
              <Users className="w-5 h-5" />
            </div>
            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{stats.studentsGrowth}%
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 tracking-tight font-sans">
              {stats.totalStudents.toLocaleString()}
            </span>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Total Students</p>
          </div>
          {/* Decorative curve wave graphic */}
          <div className="mt-3 h-6 w-full opacity-60">
            <svg viewBox="0 0 100 25" className="w-full h-full text-blue-500 fill-current">
              <path d="M0,15 C20,5 40,22 60,10 C80,2 90,18 100,8 L100,25 L0,25 Z" opacity="0.2"></path>
              <path d="M0,18 C25,12 45,24 70,14 C85,8 95,20 100,12 L100,25 L0,25 Z" opacity="0.3"></path>
            </svg>
          </div>
        </div>

        {/* Card 2: Today's Attendance */}
        <div className="relative overflow-hidden bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between mb-2">
            <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{stats.todayAttendanceGrowth}%
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 tracking-tight font-sans">
              {stats.todayAttendancePercent}%
            </span>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Today&apos;s Attendance</p>
          </div>
          <div className="mt-3 h-6 w-full opacity-60">
            <svg viewBox="0 0 100 25" className="w-full h-full text-emerald-500 fill-current">
              <path d="M0,16 C20,8 45,20 65,12 C80,6 92,18 100,10 L100,25 L0,25 Z" opacity="0.2"></path>
              <path d="M0,20 C30,14 50,22 75,15 C90,10 96,18 100,14 L100,25 L0,25 Z" opacity="0.3"></path>
            </svg>
          </div>
        </div>

        {/* Card 3: Registered Buses */}
        <div className="relative overflow-hidden bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between mb-2">
            <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30">
              <Bus className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">
              0%
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 tracking-tight font-sans">
              {stats.registeredBuses}
            </span>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Registered Buses</p>
          </div>
          <div className="mt-3 h-6 w-full opacity-60">
            <svg viewBox="0 0 100 25" className="w-full h-full text-amber-500 fill-current">
              <path d="M0,12 C25,18 50,8 75,14 C90,18 95,12 100,10 L100,25 L0,25 Z" opacity="0.2"></path>
              <path d="M0,15 C20,10 40,20 60,12 C80,5 95,15 100,12 L100,25 L0,25 Z" opacity="0.3"></path>
            </svg>
          </div>
        </div>

        {/* Card 4: Fee Collected (This Month) */}
        <div className="relative overflow-hidden bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between mb-2">
            <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/30">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{stats.feeGrowth}%
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 tracking-tight font-sans">
              ৳ {stats.feeCollectedMonth.toLocaleString()}
            </span>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Fee Collected (This Month)</p>
          </div>
          <div className="mt-3 h-6 w-full opacity-60">
            <svg viewBox="0 0 100 25" className="w-full h-full text-purple-600 fill-current">
              <path d="M0,14 C30,6 55,22 75,10 C90,4 96,16 100,9 L100,25 L0,25 Z" opacity="0.2"></path>
              <path d="M0,18 C25,12 50,20 70,14 C85,10 95,18 100,12 L100,25 L0,25 Z" opacity="0.3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* 3. MAIN GRID ROW 1: ACADEMIC OVERVIEW + STUDENT DISTRIBUTION + QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Academic Overview Chart (Span 6) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Academic Overview</h3>
              <p className="text-[11px] text-slate-400">Weekly institutional trend performance</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-3 text-[10px] font-medium text-slate-500 pr-2">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mr-1"></span> Attendance
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span> Results
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span> Fee Collection
                </span>
              </div>
              <select
                value={chartRange}
                onChange={(e) => setChartRange(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Term</option>
              </select>
            </div>
          </div>

          {/* SVG Vector Chart matching the reference lines */}
          <div className="relative h-48 w-full pt-4">
            <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible">
              {/* Horizontal Grid lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="60" x2="500" y2="60" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#E2E8F0" strokeWidth="1" />

              {/* Attendance Line (Blue) */}
              <path
                d="M 20,80 Q 100,50 180,60 T 340,70 T 480,50"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {[
                [20, 80],
                [100, 60],
                [180, 60],
                [260, 50],
                [340, 70],
                [420, 65],
                [480, 50],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
              ))}

              {/* Results Line (Green) */}
              <path
                d="M 20,110 Q 100,90 180,85 T 340,105 T 480,75"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {[
                [20, 110],
                [100, 95],
                [180, 85],
                [260, 80],
                [340, 105],
                [420, 95],
                [480, 75],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
              ))}

              {/* Fee Collection Line (Orange) */}
              <path
                d="M 20,135 Q 100,120 180,110 T 340,130 T 480,90"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {[
                [20, 135],
                [100, 125],
                [180, 110],
                [260, 105],
                [340, 130],
                [420, 120],
                [480, 90],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
              ))}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-2 px-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Student Distribution Donut Chart (Span 3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-sm font-bold text-slate-900">Student Distribution</h3>
            <p className="text-[11px] text-slate-400">Section and class breakdown</p>
          </div>

          <div className="relative flex items-center justify-center my-2">
            {/* SVG Donut */}
            <svg className="w-36 h-36 transform -rotate-90">
              <circle cx="72" cy="72" r="54" stroke="#F1F5F9" strokeWidth="18" fill="transparent" />
              {/* College (6-12): 48% -> Blue */}
              <circle
                cx="72"
                cy="72"
                r="54"
                stroke="#2563EB"
                strokeWidth="18"
                fill="transparent"
                strokeDasharray="339.29"
                strokeDashoffset="176.43"
              />
              {/* School (1-5): 32% -> Green */}
              <circle
                cx="72"
                cy="72"
                r="54"
                stroke="#10B981"
                strokeWidth="18"
                fill="transparent"
                strokeDasharray="339.29"
                strokeDashoffset="230.71"
                style={{ transformOrigin: 'center', transform: 'rotate(172deg)' }}
              />
              {/* Others: 20% -> Amber */}
              <circle
                cx="72"
                cy="72"
                r="54"
                stroke="#F59E0B"
                strokeWidth="18"
                fill="transparent"
                strokeDasharray="339.29"
                strokeDashoffset="271.43"
                style={{ transformOrigin: 'center', transform: 'rotate(288deg)' }}
              />
            </svg>

            {/* Inner Center Label */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-base font-black text-slate-900 leading-none">1,250</span>
              <span className="text-[10px] text-slate-400 font-medium">Total</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2"></span>
                School (1-5)
              </span>
              <span className="font-bold text-slate-900">32.0%</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-2"></span>
                College (6-12)
              </span>
              <span className="font-bold text-slate-900">48.0%</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-2"></span>
                Others
              </span>
              <span className="font-bold text-slate-900">20.0%</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid (Span 3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card flex flex-col justify-between">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
            <p className="text-[11px] text-slate-400">Institutional shortcuts</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onNavigate('students')}
              className="p-3 bg-blue-50/70 hover:bg-blue-100/80 border border-blue-100 rounded-xl flex flex-col items-center text-center transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">Add Student</span>
            </button>

            <button
              onClick={() => onNavigate('communication')}
              className="p-3 bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-100 rounded-xl flex flex-col items-center text-center transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <Bell className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">Publish Notice</span>
            </button>

            <button
              onClick={() => onNavigate('attendance')}
              className="p-3 bg-purple-50/70 hover:bg-purple-100/80 border border-purple-100 rounded-xl flex flex-col items-center text-center transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">Take Attendance</span>
            </button>

            <button
              onClick={() => onNavigate('fees')}
              className="p-3 bg-amber-50/70 hover:bg-amber-100/80 border border-amber-100 rounded-xl flex flex-col items-center text-center transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">Manage Fees</span>
            </button>

            <button
              onClick={() => onNavigate('results')}
              className="p-3 bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-100 rounded-xl flex flex-col items-center text-center transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">View Results</span>
            </button>

            <button
              onClick={() => onNavigate('mobile-control')}
              className="p-3 bg-sky-50/70 hover:bg-sky-100/80 border border-sky-100 rounded-xl flex flex-col items-center text-center transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">Send Message</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. MAIN GRID ROW 2: RECENT ACTIVITIES + UPCOMING EVENTS + SPOTLIGHT BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activities (Span 4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Activities</h3>
              <p className="text-[11px] text-slate-400">Live operational events</p>
            </div>
            <button
              onClick={() => onNavigate('operations')}
              className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                text: 'New student admitted: Rahim Ahmed',
                time: '2 minutes ago',
                icon: Users,
                color: 'text-blue-600 bg-blue-50 border-blue-200',
              },
              {
                text: 'Fee payment received: Tk. 5,000',
                time: '5 minutes ago',
                icon: CreditCard,
                color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
              },
              {
                text: 'New notice published: Examination Schedule',
                time: '10 minutes ago',
                icon: FileText,
                color: 'text-purple-600 bg-purple-50 border-purple-200',
              },
              {
                text: 'Bus #03 arrived at school gate',
                time: '15 minutes ago',
                icon: Bus,
                color: 'text-amber-600 bg-amber-50 border-amber-200',
              },
              {
                text: 'Attendance updated for Class 10-A',
                time: '20 minutes ago',
                icon: CalendarCheck,
                color: 'text-teal-600 bg-teal-50 border-teal-200',
              },
            ].map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div key={idx} className="flex items-start space-x-3 text-xs">
                  <div className={`p-2 rounded-xl border ${activity.color} shrink-0 mt-0.5`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 leading-snug truncate">{activity.text}</p>
                    <span className="text-[10px] text-slate-400 font-normal">{activity.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events (Span 4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Upcoming Events</h3>
              <p className="text-[11px] text-slate-400">Institutional schedules</p>
            </div>
            <button
              onClick={() => onNavigate('academics')}
              className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center"
            >
              <span>View Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                day: '15',
                month: 'NOV',
                title: 'Annual Examination – Class 9-12',
                time: '08:00 AM – 12:00 PM',
                category: 'Examination',
                badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
              },
              {
                day: '17',
                month: 'NOV',
                title: 'Parent-Teacher Meeting',
                time: '10:00 AM – 01:00 PM',
                category: 'Meeting',
                badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
              },
              {
                day: '20',
                month: 'NOV',
                title: 'Science Fair',
                time: '09:00 AM – 04:00 PM',
                category: 'Event',
                badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
              },
            ].map((event, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-sm">
                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                      {event.month}
                    </span>
                    <span className="text-base font-extrabold text-slate-900 leading-none">{event.day}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{event.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{event.time}</p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${event.badgeColor}`}
                >
                  {event.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Spotlight / Promo Card (Span 4) */}
        <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-blue-900/30 shadow-card bg-gradient-to-br from-[#0B1E38] via-[#0F294D] to-[#1D4ED8] p-5 text-white flex flex-col justify-between relative group">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Image
                  src="/logo.png"
                  alt="Northern Star Emblem"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span className="text-[11px] font-extrabold tracking-wider text-amber-400 uppercase">
                  Northern Star
                </span>
              </div>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/20 text-slate-200">
                School & College
              </span>
            </div>

            <p className="text-sm font-semibold text-white/95 mt-2 italic leading-relaxed">
              &quot;Education is the key to a better tomorrow.&quot;
            </p>
            <p className="text-[11px] text-blue-100 mt-1">
              Empowering students with 21st-century values, discipline, and digital fluency.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between relative z-10">
            <span className="text-xs font-bold text-amber-400">Learn • Grow • Excel</span>
            <button
              onClick={() => onNavigate('mobile-control')}
              className="px-3 py-1.5 bg-white text-slate-900 font-bold rounded-lg text-[11px] flex items-center space-x-1 hover:bg-slate-100 transition-colors"
            >
              <span>Learn More</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
