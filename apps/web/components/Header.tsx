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
  Key,
  LogIn,
  LogOut,
  Shield,
  User,
  Eye,
  EyeOff,
  ChevronDown,
  X,
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
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Super Admin',
    role: 'Administrator',
    email: 'admin@northernstar.edu.bd',
    id: 'ADMIN001',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  });
  const [loginRole, setLoginRole] = useState<'admin' | 'teacher' | 'student' | 'parent' | 'staff'>('admin');
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState<string | null>(null);

  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId.trim() || !loginPassword.trim()) {
      setLoginFeedback('Please enter both your ID/Email and Password.');
      return;
    }

    // Role-based profiles
    const roleProfiles: Record<string, typeof currentUser> = {
      admin: {
        name: 'Super Admin',
        role: 'Administrator',
        email: loginId.includes('@') ? loginId : 'admin@northernstar.edu.bd',
        id: 'ADMIN001',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      },
      teacher: {
        name: 'Mr. Tanvir Hasan',
        role: 'Faculty • Higher Mathematics',
        email: 'tanvir.hasan@northernstar.edu.bd',
        id: loginId || 'NST202501',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      },
      student: {
        name: 'Rahim Ahmed',
        role: 'Student • Class 9-A',
        email: 'rahim.ahmed@northernstar.edu.bd',
        id: loginId || 'NSC2025001',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      },
      parent: {
        name: 'Mrs. Fatema Akter',
        role: 'Guardian of Rahim Ahmed',
        email: 'fatema.akter@northernstar.edu.bd',
        id: loginId || 'PRN2025001',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      },
      staff: {
        name: 'Ms. Nusrat Jahan',
        role: 'Staff • Administration',
        email: 'nusrat.jahan@northernstar.edu.bd',
        id: loginId || 'STF2025001',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      },
    };

    setCurrentUser(roleProfiles[loginRole] || roleProfiles.admin);
    setShowLoginModal(false);
    setLoginId('');
    setLoginPassword('');
    setLoginFeedback(null);
  };

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

        {/* User Profile Menu with Portal Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 pl-3 border-l border-slate-200 hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 relative rounded-full overflow-hidden border border-slate-200 shadow-sm ring-2 ring-blue-500/20">
              <Image
                src={currentUser.avatar}
                alt={currentUser.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</span>
              <span className="text-[10px] text-blue-600 font-semibold">{currentUser.role}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="pb-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500 font-mono truncate">{currentUser.email}</p>
                <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {currentUser.role}
                </span>
              </div>

              <div className="py-2 space-y-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    setShowLoginModal(true);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-50 rounded-xl transition-colors flex items-center space-x-2"
                >
                  <Key className="w-3.5 h-3.5 text-blue-600" />
                  <span>Portal Login / Switch Role</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setCurrentUser({
                      name: 'Guest Observer',
                      role: 'Public Viewer',
                      email: 'guest@northernstar.edu.bd',
                      id: 'GUEST',
                      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
                    });
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center space-x-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: PORTAL AUTHENTICATION & LOGIN */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Campus Identity Portal Access</h3>
                  <p className="text-[10px] text-slate-400">Secure credential authentication</p>
                </div>
              </div>
              <button onClick={() => setShowLoginModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Portal Role Selector */}
            <div className="grid grid-cols-5 gap-1 my-4 bg-slate-100 p-1 rounded-2xl text-[10px] font-bold">
              {[
                { key: 'admin', label: 'Admin' },
                { key: 'teacher', label: 'Teacher' },
                { key: 'student', label: 'Student' },
                { key: 'parent', label: 'Parent' },
                { key: 'staff', label: 'Staff' },
              ].map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => {
                    setLoginRole(r.key as any);
                    if (r.key === 'admin') setLoginId('admin@northernstar.edu.bd');
                    else if (r.key === 'teacher') setLoginId('NST202501');
                    else if (r.key === 'student') setLoginId('NSC2025001');
                    else if (r.key === 'parent') setLoginId('PRN2025001');
                    else if (r.key === 'staff') setLoginId('STF2025001');
                    setLoginPassword('NSSC@2025');
                  }}
                  className={`py-1.5 rounded-xl transition-all capitalize ${
                    loginRole === r.key ? 'bg-white text-slate-900 shadow-sm font-extrabold' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <form onSubmit={handlePortalLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {loginRole === 'admin' ? 'Administrator Email' : `${loginRole.toUpperCase()} ID Code or Email`}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    loginRole === 'student' ? 'e.g. NSC2025001' : loginRole === 'teacher' ? 'e.g. NST202501' : 'Email or User ID'
                  }
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">Access Password</label>
                  <button
                    type="button"
                    onClick={() => setLoginPassword('NSSC@2025')}
                    className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Use Default (NSSC@2025)
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-xs p-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showLoginPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {loginFeedback && (
                <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2 rounded-xl">{loginFeedback}</p>
              )}

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 flex items-center space-x-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Authenticate & Enter Portal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
