'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { DashboardView } from '@/components/DashboardView';
import { MobileControlCenter } from '@/components/MobileControlCenter';
import { MobileSimulator } from '@/components/MobileSimulator';
import { StudentManagementView } from '@/components/StudentManagementView';
import { AttendanceView } from '@/components/AttendanceView';
import { ResultsView } from '@/components/ResultsView';
import { FeeManagementView } from '@/components/FeeManagementView';
import { OperationsView } from '@/components/OperationsView';
import { dataService } from '@/lib/data-service';
import { DashboardStats } from '@/lib/types';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Database, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';

export default function Home() {
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 1250,
    studentsGrowth: 5,
    todayAttendancePercent: 98,
    todayAttendanceGrowth: 2,
    presentCount: 1200,
    absentCount: 50,
    lateCount: 20,
    registeredBuses: 12,
    feeCollectedMonth: 375500,
    feeGrowth: 12,
    totalTeachers: 68,
    totalStaff: 24,
    totalClasses: 12,
    systemStatus: 'All Systems Online',
    uptime: '99.9%',
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await dataService.getDashboardStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* 1. Official Deep Navy Sidebar */}
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

      {/* 2. Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onOpenMobileControl={() => setActiveModule('mobile-control')}
          onOpenMobilePreview={() => setActiveModule('mobile-preview')}
        />

        <main className="flex-1 p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {activeModule === 'dashboard' && (
            <DashboardView stats={stats} onNavigate={setActiveModule} />
          )}

          {activeModule === 'mobile-control' && (
            <MobileControlCenter onOpenMobilePreview={() => setActiveModule('mobile-preview')} />
          )}

          {activeModule === 'mobile-preview' && <MobileSimulator />}

          {activeModule === 'students' && <StudentManagementView />}

          {activeModule === 'attendance' && <AttendanceView />}

          {activeModule === 'results' && <ResultsView />}

          {activeModule === 'examinations' && <ResultsView />}

          {activeModule === 'fees' && <FeeManagementView />}

          {(activeModule === 'library' ||
            activeModule === 'transport' ||
            activeModule === 'inventory' ||
            activeModule === 'operations') && <OperationsView />}

          {activeModule === 'academics' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Academic Structure & Routine Management
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Classes 1 through 12, Sections, Groups (Science, Commerce, Humanities), and Subject Allocations.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">High School Section (Classes 1 - 10)</h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between font-semibold">
                      <span>Class 9 (Sections A, B)</span>
                      <span className="text-blue-600">90 Enrolled Students</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between font-semibold">
                      <span>Class 10 (Section A)</span>
                      <span className="text-blue-600">45 Enrolled Students</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">College Section (HSC 11 & 12)</h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between font-semibold">
                      <span>HSC 1st Year (Science, Commerce, Arts)</span>
                      <span className="text-blue-600">180 Enrolled Students</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between font-semibold">
                      <span>HSC 2nd Year (Board Candidates)</span>
                      <span className="text-blue-600">165 Enrolled Students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeModule === 'communication' && (
            <MobileControlCenter onOpenMobilePreview={() => setActiveModule('mobile-preview')} />
          )}

          {activeModule === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Institution System Settings & Security
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage institutional metadata, PostgreSQL connection parameters, and security policies.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center">
                  <Database className="w-4 h-4 mr-2 text-blue-600" />
                  Supabase Free-Tier Backend Status
                </h3>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Institution Identity:</span>
                    <strong className="text-slate-800">Northern Star School & College</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Row Level Security (RLS):</span>
                    <span className="text-emerald-600 font-bold flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Enabled Across All 50+ Tables
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Database Schema:</span>
                    <span className="font-mono text-slate-700">supabase/migrations/20261115000001_initial_schema.sql</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Realtime Remote Configuration:</span>
                    <span className="text-emerald-600 font-bold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
