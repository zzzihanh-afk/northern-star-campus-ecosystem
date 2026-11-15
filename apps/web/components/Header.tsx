'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Bell,
  Maximize2,
  Minimize2,
  Smartphone,
  CheckCircle,
  Database,
  ExternalLink,
} from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

interface HeaderProps {
  onSearch?: (term: string) => void;
  onOpenMobileControl: () => void;
  onOpenMobilePreview: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onOpenMobileControl,
  onOpenMobilePreview,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Search students, teachers, or any module..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Right Controls & Profile */}
      <div className="flex items-center space-x-3 ml-4">
        {/* Backend Status indicator */}
        <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 border border-slate-200 text-slate-600">
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span>{isSupabaseConfigured ? 'Supabase Live' : 'Supabase Ready'}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        {/* Quick Simulator Launch Button */}
        <button
          onClick={onOpenMobilePreview}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-semibold transition-all shadow-sm"
          title="Open Mobile App Simulator"
        >
          <Smartphone className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">Mobile Portals</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* Notifications Icon with Counter */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
              3
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900">Notifications</h4>
                <span className="text-[10px] text-blue-600 font-medium cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs">
                  <p className="font-semibold text-slate-900">Exam Schedule Published</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Annual Examination Class 9-12 published.</p>
                  <span className="text-[9px] text-slate-400 mt-1 block">10 mins ago</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
                  <p className="font-semibold text-slate-900">Fee Received (৳ 5,000)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Rahim Ahmed paid November tuition.</p>
                  <span className="text-[9px] text-slate-400 mt-1 block">25 mins ago</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100 text-xs">
                  <p className="font-semibold text-slate-900">Bus #03 Check-in</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Campus arrival recorded at Main Gate.</p>
                  <span className="text-[9px] text-slate-400 mt-1 block">1 hour ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 relative rounded-full overflow-hidden border border-slate-200 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
              alt="Super Admin"
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800 leading-tight">Super Admin</span>
            <span className="text-[10px] text-slate-400 font-medium">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};
