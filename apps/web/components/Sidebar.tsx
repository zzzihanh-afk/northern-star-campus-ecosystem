'use client';

import React from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  FileSpreadsheet,
  Award,
  CreditCard,
  MessageSquare,
  BookOpen,
  Bus,
  Package,
  ShieldCheck,
  Settings,
  Smartphone,
  Radio,
  CheckCircle2,
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'academics', label: 'Academic Management', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'examinations', label: 'Examinations', icon: FileSpreadsheet },
    { id: 'results', label: 'Results & Reports', icon: Award },
    { id: 'fees', label: 'Fee Management', icon: CreditCard },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'operations', label: 'Campus Operations', icon: ShieldCheck },
    { id: 'mobile-control', label: 'Mobile App Management', icon: Smartphone, highlight: true },
    { id: 'mobile-preview', label: 'Mobile App Simulator', icon: Radio },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#081528] text-slate-300 flex flex-col justify-between select-none border-r border-[#0F294D] shrink-0 sticky top-0 h-screen z-30">
      {/* Top Header / Branding */}
      <div className="flex flex-col">
        <div className="p-4 border-b border-slate-800/80 flex items-center space-x-3 bg-[#060E1A]">
          <div className="w-12 h-12 relative flex-shrink-0 bg-white/10 rounded-xl p-1 shadow-inner border border-amber-500/30">
            <Image
              src="/logo.png"
              alt="Northern Star School & College Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-white text-xs tracking-wider uppercase leading-tight font-sans">
              Northern Star
            </span>
            <span className="text-[10px] text-slate-400 font-medium">School & College</span>
            <span className="text-[9px] text-amber-400 font-semibold italic mt-0.5 tracking-tight">
              Learn • Grow • Excel
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)] pr-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30 translate-x-1'
                    : item.highlight
                    ? 'text-amber-400 hover:bg-slate-800/60 hover:text-amber-300'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : item.highlight ? 'text-amber-400' : 'text-slate-400 group-hover:text-blue-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
                {item.highlight && !isActive && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                )}
                {isActive && (
                  <div className="absolute right-2 w-1.5 h-4 bg-white/80 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom System Status Widget */}
      <div className="p-3 border-t border-slate-800/80 bg-[#060E1A]/90 relative overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold text-slate-200">System Status</span>
          </div>
          <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 rounded-full">
            Online
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>Uptime: 99.9%</span>
          <span className="text-amber-400/90 font-mono">v1.2.0</span>
        </div>

        {/* Decorative subtle gold/navy wave line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-amber-400 to-blue-500 opacity-70"></div>
      </div>
    </aside>
  );
};
