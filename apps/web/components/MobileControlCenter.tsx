'use client';

import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Sliders,
  Bell,
  Layers,
  Palette,
  Power,
  RefreshCw,
  Send,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  ShieldAlert,
  Sparkles,
  Info,
  Radio,
} from 'lucide-react';
import { AppConfiguration, AppModule, UserRole } from '@/lib/types';
import { dataService } from '@/lib/data-service';

interface MobileControlCenterProps {
  onOpenMobilePreview: () => void;
}

export const MobileControlCenter: React.FC<MobileControlCenterProps> = ({ onOpenMobilePreview }) => {
  const [activeTab, setActiveTab] = useState<'modules' | 'config' | 'announcements' | 'maintenance'>('modules');
  const [config, setConfig] = useState<AppConfiguration | null>(null);
  const [modules, setModules] = useState<AppModule[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Announcement state
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [targetAudience, setTargetAudience] = useState<'all' | 'student' | 'parent' | 'teacher' | 'staff'>('all');
  const [isEmergency, setIsEmergency] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const loadedConfig = await dataService.getAppConfiguration();
    const loadedModules = await dataService.getAppModules();
    setConfig(loadedConfig);
    setModules(loadedModules);
  };

  const handleToggleModule = async (moduleKey: string, currentStatus: boolean) => {
    const updated = await dataService.toggleAppModule(moduleKey, !currentStatus);
    setModules(updated);
    triggerSuccessBanner();
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    setIsSaving(true);
    await dataService.updateAppConfiguration(config);
    setIsSaving(false);
    triggerSuccessBanner();
  };

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setAnnouncementTitle('');
      setAnnouncementContent('');
    }, 3500);
  };

  const triggerSuccessBanner = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Remote Sync Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700 font-semibold mb-2">
            <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Supabase Realtime Remote Config Active</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
            Central Mobile App Control Centre
          </h2>
          <p className="text-xs text-slate-500 max-w-xl mt-1">
            Centrally manage Northern Star mobile applications. Any changes saved here update mobile client layouts, features, and permissions dynamically over Supabase without requiring an APK rebuild.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={onOpenMobilePreview}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-md shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Smartphone className="w-4 h-4" />
            <span>Launch Live Mobile Simulator</span>
          </button>
        </div>
      </div>

      {/* Success Notification Bar */}
      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Configuration published to Supabase! Mobile clients will automatically reflect the latest settings.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('modules')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'modules'
              ? 'bg-[#0B1E38] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Module Management ({modules.filter((m) => m.is_enabled).length} Enabled)</span>
        </button>

        <button
          onClick={() => setActiveTab('config')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'config'
              ? 'bg-[#0B1E38] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Branding & Appearance</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'announcements'
              ? 'bg-[#0B1E38] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Push Notifications & Broadcasts</span>
        </button>

        <button
          onClick={() => setActiveTab('maintenance')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'maintenance'
              ? 'bg-[#0B1E38] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <span>Maintenance Mode & Restrictions</span>
        </button>
      </div>

      {/* TAB 1: MODULE MANAGEMENT */}
      {activeTab === 'modules' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Remote Feature & Module Toggles</h3>
              <p className="text-xs text-slate-500">
                Turn features on or off in the mobile application in real-time. Disabling a module instantly hides it from student, parent, teacher and staff navigation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between ${
                  mod.is_enabled
                    ? 'bg-slate-50/70 border-slate-200 shadow-sm'
                    : 'bg-slate-100/50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      mod.is_enabled ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-slate-300 text-slate-600'
                    }`}
                  >
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-slate-900">{mod.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">({mod.module_key})</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{mod.description}</p>
                    <div className="flex items-center space-x-1.5 mt-2">
                      <span className="text-[10px] font-medium text-slate-400">Allowed roles:</span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        All 4 Portals
                      </span>
                    </div>
                  </div>
                </div>

                {/* Toggle switch */}
                <button
                  onClick={() => handleToggleModule(mod.module_key, mod.is_enabled)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    mod.is_enabled ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                  title={mod.is_enabled ? 'Disable Module' : 'Enable Module'}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BRANDING & REMOTE APPEARANCE */}
      {activeTab === 'config' && config && (
        <form onSubmit={handleSaveConfig} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Application Branding & Remote Config</h3>
            <p className="text-xs text-slate-500">
              Customize colors, welcome messaging, banners, and institutional contact numbers displayed in mobile clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Application Name</label>
              <input
                type="text"
                value={config.app_name}
                onChange={(e) => setConfig({ ...config, app_name: e.target.value })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Color (Navy)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={config.primary_color}
                  onChange={(e) => setConfig({ ...config, primary_color: e.target.value })}
                  className="w-10 h-10 rounded-xl border border-slate-200 p-1 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.primary_color}
                  onChange={(e) => setConfig({ ...config, primary_color: e.target.value })}
                  className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Secondary Color (Royal Blue)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={config.secondary_color}
                  onChange={(e) => setConfig({ ...config, secondary_color: e.target.value })}
                  className="w-10 h-10 rounded-xl border border-slate-200 p-1 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.secondary_color}
                  onChange={(e) => setConfig({ ...config, secondary_color: e.target.value })}
                  className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Accent Color (Gold)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={config.accent_color}
                  onChange={(e) => setConfig({ ...config, accent_color: e.target.value })}
                  className="w-10 h-10 rounded-xl border border-slate-200 p-1 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.accent_color}
                  onChange={(e) => setConfig({ ...config, accent_color: e.target.value })}
                  className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={config.contact_email}
                onChange={(e) => setConfig({ ...config, contact_email: e.target.value })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={config.contact_phone}
                onChange={(e) => setConfig({ ...config, contact_phone: e.target.value })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Welcome Banner Title</label>
            <input
              type="text"
              value={config.welcome_banner_title}
              onChange={(e) => setConfig({ ...config, welcome_banner_title: e.target.value })}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Welcome Banner Subtitle</label>
            <input
              type="text"
              value={config.welcome_banner_subtitle}
              onChange={(e) => setConfig({ ...config, welcome_banner_subtitle: e.target.value })}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 flex items-center space-x-2 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isSaving ? 'Updating Supabase...' : 'Save & Publish Remote Config'}</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: ANNOUNCEMENTS & PUSH BROADCAST */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Compose Push Broadcast</h3>
            <p className="text-xs text-slate-500 mb-4">
              Send targeted notifications and emergency bulletins directly to mobile devices.
            </p>

            {broadcastSent && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Broadcast successfully dispatched to target mobile users!</span>
              </div>
            )}

            <form onSubmit={handleSendAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Audience</label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="all">Institution Wide (Students, Parents, Teachers, Staff)</option>
                  <option value="student">Students Only</option>
                  <option value="parent">Parents Only</option>
                  <option value="teacher">Teachers Only</option>
                  <option value="staff">Staff Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Announcement Title</label>
                <input
                  type="text"
                  placeholder="e.g. Annual Sports Day Schedule Announced"
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message Body</label>
                <textarea
                  rows={4}
                  placeholder="Type the notification content to be delivered to mobile devices..."
                  value={announcementContent}
                  onChange={(e) => setAnnouncementContent(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <input
                  type="checkbox"
                  id="emergency"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <label htmlFor="emergency" className="text-xs font-bold text-red-800 cursor-pointer">
                  Mark as Emergency Priority Bulletin (Overrides silent mode & highlights badge)
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md shadow-blue-600/20"
              >
                <Send className="w-4 h-4" />
                <span>Send Push Notification Now</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Recent Push Notification History</h3>
            <p className="text-xs text-slate-500 mb-4">Delivery logs across Northern Star mobile instances.</p>

            <div className="space-y-3">
              {[
                { title: 'Exam Schedule Published', target: 'Class 9 & 10 Students', time: '10 minutes ago', status: 'Delivered (100%)' },
                { title: 'November Tuition Receipt', target: 'Parents of Class 9-A', time: '1 hour ago', status: 'Delivered (100%)' },
                { title: 'Parent-Teacher Meeting Reminder', target: 'All Parents', time: 'Yesterday', status: 'Delivered (99.8%)' },
                { title: 'Annual Sports Day Signups', target: 'All Students & Teachers', time: '3 days ago', status: 'Delivered (100%)' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Target: {item.target} • {item.time}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MAINTENANCE MODE */}
      {activeTab === 'maintenance' && config && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Campus Maintenance Mode Control</h3>
              <p className="text-xs text-slate-500">
                Put mobile apps into maintenance mode during grading calculation, database migrations or campus emergencies.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-xs font-bold ${config.maintenance_mode ? 'text-red-600' : 'text-slate-400'}`}>
                {config.maintenance_mode ? 'MAINTENANCE ACTIVE' : 'SYSTEM OPERATIONAL'}
              </span>
              <button
                type="button"
                onClick={() => {
                  const updated = !config.maintenance_mode;
                  setConfig({ ...config, maintenance_mode: updated });
                  dataService.updateAppConfiguration({ maintenance_mode: updated });
                  triggerSuccessBanner();
                }}
                className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  config.maintenance_mode ? 'bg-red-500 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="bg-white w-5 h-5 rounded-full shadow-md" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Custom Maintenance Message Displayed in Mobile App
            </label>
            <textarea
              rows={3}
              value={config.maintenance_message}
              onChange={(e) => setConfig({ ...config, maintenance_message: e.target.value })}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <p className="font-bold">Important Administrative Guarantee</p>
              <p className="mt-0.5">
                Even when Maintenance Mode is enabled, Super Admin accounts retain full access to administrative endpoints and the web dashboard. Students, parents, and unauthorized personnel will see the maintenance dialog.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
