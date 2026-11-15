'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Layers,
  Plus,
  Users,
  BookOpen,
  Calendar,
  Clock,
  School,
  CheckCircle2,
  X,
  Search,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ClassDefinition, INITIAL_CAMPUS_CLASSES } from './StudentManagementView';

export const AcademicManagementView: React.FC = () => {
  const [classes, setClasses] = useState<ClassDefinition[]>(INITIAL_CAMPUS_CLASSES);
  const [activeTier, setActiveTier] = useState<'All' | 'Primary' | 'Secondary' | 'College'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Add Class Modal State
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassCategory, setNewClassCategory] = useState<'Primary' | 'Secondary' | 'College'>('Secondary');
  const [newClassSections, setNewClassSections] = useState<string[]>(['Section A', 'Section B']);
  const [customSectionInput, setCustomSectionInput] = useState('');

  const handleAddSectionToNewClass = (sec: string) => {
    const trimmed = sec.trim();
    if (!trimmed) return;
    if (!newClassSections.includes(trimmed)) {
      setNewClassSections([...newClassSections, trimmed]);
    }
    setCustomSectionInput('');
  };

  const handleRemoveSectionFromNewClass = (sec: string) => {
    setNewClassSections(newClassSections.filter((s) => s !== sec));
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    if (newClassSections.length === 0) {
      alert('Please include at least one section for this class.');
      return;
    }

    const createdClass: ClassDefinition = {
      id: `c-custom-${Date.now()}`,
      name: newClassName.trim(),
      category: newClassCategory,
      sections: [...newClassSections],
    };

    setClasses([...classes, createdClass]);
    setShowAddClassModal(false);
    setNewClassName('');
    setNewClassSections(['Section A', 'Section B']);
  };

  const filteredClasses = classes.filter((c) => {
    const matchesTier = activeTier === 'All' || c.category === activeTier;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const totalSections = classes.reduce((sum, c) => sum + c.sections.length, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Institutional Structure
            </span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Play - Class 12
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans mt-1">
            Academic Structure & Section Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage institutional class tiers, assign sections with capacities, and coordinate academic streams.
          </p>
        </div>

        <button
          onClick={() => setShowAddClassModal(true)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-md shadow-blue-600/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Class & Sections</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Classes</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{classes.length}</p>
          <span className="text-[10px] text-blue-600 font-bold mt-1 block">Full K-12 + College</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Sections</span>
          <p className="text-2xl font-black text-blue-600 mt-1">{totalSections}</p>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">Active cohorts</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Primary Division</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {classes.filter((c) => c.category === 'Primary').length} Classes
          </p>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">Play Group to Class 5</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Secondary & College</span>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {classes.filter((c) => c.category !== 'Primary').length} Classes
          </p>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">Class 6 to HSC 12</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {(['All', 'Primary', 'Secondary', 'College'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTier === tier
                  ? 'bg-[#081528] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tier === 'All' ? 'All Classes' : `${tier} Tier`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search classes..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Class & Section Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map((cls) => (
          <div
            key={cls.id}
            className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    cls.category === 'Primary'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : cls.category === 'Secondary'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}
                >
                  {cls.category}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {cls.sections.length} Active Section{cls.sections.length > 1 ? 's' : ''}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900">{cls.name}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Northern Star School &amp; College Campus
              </p>
            </div>

            {/* Included Sections Pills */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Included Sections:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cls.sections.map((sec) => (
                  <span
                    key={sec}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center space-x-1"
                  >
                    <Layers className="w-3 h-3 text-blue-600" />
                    <span>{sec}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Class Status</span>
              <span className="text-emerald-600 font-bold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Active Roster</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: ADD CLASS & INCLUDE SECTIONS */}
      {showAddClassModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Add Class to Academic Structure</h3>
                  <p className="text-[10px] text-slate-500">Configure class title, academic tier, and include assigned sections.</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddClassModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Class 7, O-Level Physics, HSC Science A"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Category</label>
                <select
                  value={newClassCategory}
                  onChange={(e) => setNewClassCategory(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Primary">Primary (Play Group - Class 5)</option>
                  <option value="Secondary">Secondary / High School (Class 6 - 10)</option>
                  <option value="College">College / Higher Secondary (HSC 11 - 12)</option>
                </select>
              </div>

              {/* SECTIONS INCLUSION FEATURE */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      <span>Included Sections</span>
                    </label>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Specify which sections belong to this class.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    {newClassSections.length} Sections
                  </span>
                </div>

                {/* Quick Add Section Chips */}
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Quick Add Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Section A', 'Section B', 'Section C', 'Section D', 'Morning Shift', 'Day Shift'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleAddSectionToNewClass(preset)}
                        disabled={newClassSections.includes(preset)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all ${
                          newClassSections.includes(preset)
                            ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed'
                            : 'bg-white hover:bg-blue-50 text-slate-700 border-slate-300 hover:border-blue-300'
                        }`}
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Section Input */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    placeholder="Type custom section name (e.g. Science A, Tulip)..."
                    value={customSectionInput}
                    onChange={(e) => setCustomSectionInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSectionToNewClass(customSectionInput);
                      }
                    }}
                    className="flex-1 text-xs p-2 bg-white border border-slate-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSectionToNewClass(customSectionInput)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs"
                  >
                    Add
                  </button>
                </div>

                {/* Badges of Currently Included Sections */}
                <div className="pt-2 border-t border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-600 block mb-1.5">
                    Active Included Sections for this Class:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {newClassSections.map((sec) => (
                      <span
                        key={sec}
                        className="bg-white border border-blue-200 text-blue-900 px-2.5 py-1 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-2xs"
                      >
                        <span>{sec}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSectionFromNewClass(sec)}
                          className="w-4 h-4 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 inline-flex items-center justify-center font-bold text-[10px]"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {newClassSections.length === 0 && (
                      <span className="text-xs text-rose-500 font-semibold">
                        Warning: You must include at least one section.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={newClassSections.length === 0}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
                >
                  Save & Include Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
